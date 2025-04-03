import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from '../../interfaces/car';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() cars: Car[] = [];
  @Output() toggle = new EventEmitter<string>();

  toggleDriver(driverName: string) {
    this.toggle.emit(driverName);
  }
}
