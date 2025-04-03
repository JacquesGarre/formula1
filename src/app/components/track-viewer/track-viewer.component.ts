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

  car: Car | null = null;

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
        console.log("INITIAL POSITIONS :", data.length)
        const filtered = data.filter(pos => !(pos.x === 0 && pos.y === 0 && pos.z === 0));
        this.car!.positions = filtered;
        console.log("AFTER :", this.car!.positions.length)
        this.draw();
      });
  }

  private draw() {
    console.log("viewer - drawing car")
    const canvas = this.canvasRef.nativeElement;
    if (!this.ctx) return;

    const x = this.car!.positions[0].x;
    const y = this.car!.positions[0].y;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx!.fillStyle = 'red'; // TODO: Color of the driver
    this.ctx!.beginPath();
    this.ctx!.arc(100, 100, 8, 0, 2 * Math.PI);
    this.ctx!.fill();

    console.log("viewer - car drawn")
      
  }
}
