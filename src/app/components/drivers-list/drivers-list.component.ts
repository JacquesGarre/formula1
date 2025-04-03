import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Driver } from '../../interfaces/driver';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-drivers-list',
  imports: [CommonModule],
  templateUrl: './drivers-list.component.html',
  styleUrl: './drivers-list.component.css'
})
export class DriversListComponent {
  @Output() driverToggled = new EventEmitter<number>();
  @Input() meetingKey: number | null = null;
  @Input() sessionKey: number | null = null;

  drivers: Driver[] = [];

  constructor(private http: HttpClient) { }

  toggleDriver(driverNumber: number) {
    this.driverToggled.emit(driverNumber);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['meetingKey'] || changes['sessionKey']) {
      if (this.meetingKey == null || this.sessionKey == null) {
        return;
      }
      this.fetchDrivers(this.meetingKey, this.sessionKey);
    }
  }

  fetchDrivers(meetingKey: number, sessionKey: number): void {
    this.http
      .get<Driver[]>(`${environment.openF1ApiUrl}/drivers?meeting_key=${meetingKey}&session_key=${sessionKey}`)
      .subscribe((data) => {
        this.drivers = data;
      });
  }
}
