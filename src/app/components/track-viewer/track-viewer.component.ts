import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Car } from '../../interfaces/car';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CarPosition } from '../../interfaces/location';

@Component({
  selector: 'app-track-viewer',
  imports: [],
  templateUrl: './track-viewer.component.html',
  styleUrl: './track-viewer.component.css'
})
export class TrackViewerComponent implements OnChanges {
  @Input() meetingKey: number | null = null;
  @Input() sessionKey: number | null = null;
  @Input() driverNumbers: number[] = [];
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;


  private car: Car | null = null;
  private animationStartTime: number | null = null;
  private playbackStartTimestamp: number | null = null; // in ms
  private animationFrameId: number | null = null;
  private ctx!: CanvasRenderingContext2D | null;

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }
    this.ctx = canvas.getContext('2d');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("viewer - ngOnChanges")
    if (changes['meetingKey'] || changes['sessionKey'] || changes['driverNumbers']) {
      this.car = null;
      this.resetCanvas();
      if (this.meetingKey == null || this.sessionKey == null || this.driverNumbers.length == 0) {
        return;
      }
      this.fetchCarPosition();
    }
  }

  fetchCarPosition(): void {
    const driverNumber = this.driverNumbers[0];
    this.car = {
      driver_number: driverNumber,
      positions: []
    }
    this.http.get<CarPosition[]>(`${environment.openF1ApiUrl}/location?meeting_key=${this.meetingKey}&session_key=${this.sessionKey}&driver_number=${driverNumber}`)
      .subscribe((data) => {
        const filtered = data.filter(pos => !(pos.x === 0 && pos.y === 0 && pos.z === 0));
        this.car!.positions = filtered;
        this.startPlayback();
        //this.draw();
      });
  }

  private resetCanvas() {
    const canvas = this.canvasRef.nativeElement;
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  private draw() {
    const canvas = this.canvasRef.nativeElement;
    if (!this.ctx || !this.car || !this.car.positions.length) return;

    const positions = this.car.positions.slice(0, 1000); // limit for test
    this.resetCanvas();

    // 1. Find bounds
    const xs = positions.map(p => p.x);
    const ys = positions.map(p => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);


    // 2. Normalize all positions


    // 3. Draw the trail line


  }







  startPlayback() {
    if (!this.car || !this.car.positions.length || !this.ctx) return;
  
    const canvas = this.canvasRef.nativeElement;
  
    const rawPositions = this.car.positions.slice(1000, 2000); // skip initial if needed // check for big gaps too
    const baseTimestamp = new Date(rawPositions[0].date).getTime();
  
    // Convert timestamps to relativeTime
    const positions = rawPositions.map(pos => ({
      ...pos,
      relativeTime: new Date(pos.date).getTime() - baseTimestamp
    }));
  
    this.animationStartTime = performance.now();
  
    // bounds
    const xs = positions.map(p => p.x);
    const ys = positions.map(p => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
  
    let lastFrameDisplayed = -1; 
    
    const refreshRate = 50 // every 100ms

    const animate = (now: number) => {
      const elapsed = now - this.animationStartTime!;
      const currentStep = Math.floor(elapsed / refreshRate); 
  
      if (currentStep !== lastFrameDisplayed) {
        lastFrameDisplayed = currentStep;
  
        const targetTime = currentStep * refreshRate;
  
        // Find the position closest to the current 100ms target time
        const closest = positions.reduce((prev, curr) =>
          Math.abs(curr.relativeTime - targetTime) < Math.abs(prev.relativeTime - targetTime)
            ? curr
            : prev
        );
  
        // Normalize to canvas
        const canvasX = ((closest.x - minX) / (maxX - minX)) * canvas.width;
        const canvasY = canvas.height - ((closest.y - minY) / (maxY - minY)) * canvas.height;
  
        // clear canvas
        this.ctx!.clearRect(0, 0, canvas.width, canvas.height);


        // draw the circuit
        const normalized = positions.map(pos => ({
          x: ((pos.x - minX) / (maxX - minX)) * canvas.width,
          y: canvas.height - ((pos.y - minY) / (maxY - minY)) * canvas.height
        }));
        this.ctx!.strokeStyle = 'rgba(255, 0, 0, 0.6)';
        this.ctx!.lineWidth = 2;
        this.ctx!.beginPath();
        this.ctx!.moveTo(normalized[0].x, normalized[0].y);
        for (let i = 1; i < normalized.length; i++) {
          this.ctx!.lineTo(normalized[i].x, normalized[i].y);
        }
        this.ctx!.stroke();


        this.ctx!.fillStyle = 'red';
        this.ctx!.beginPath();
        this.ctx!.arc(canvasX, canvasY, 6, 0, 2 * Math.PI);
        this.ctx!.fill();

      }
  
      // Keep animating until the end of the data
      const totalDuration = positions[positions.length - 1].relativeTime;
      if (elapsed <= totalDuration) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        console.log('Animation complete');
      }
    };
  
    this.animationFrameId = requestAnimationFrame(animate);
  }
  
  
  
}
