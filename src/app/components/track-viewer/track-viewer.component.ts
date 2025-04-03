import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Car } from '../../interfaces/car';

@Component({
  selector: 'app-track-viewer',
  imports: [],
  templateUrl: './track-viewer.component.html',
  styleUrl: './track-viewer.component.css'
})
export class TrackViewerComponent {
  @Input() cars: Car[] = [];
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D | null;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement;

    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    this.ctx = canvas.getContext('2d');
    this.draw();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cars']) {
      this.draw();
    }
  }

  private draw() {
    const canvas = this.canvasRef.nativeElement;
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.cars
      .filter((d) => d.selected)
      .forEach((driver) => {
        this.ctx!.fillStyle = driver.color;
        this.ctx!.beginPath();
        this.ctx!.arc(driver.x, driver.y, 8, 0, 2 * Math.PI);
        this.ctx!.fill();
      });
  }
}
