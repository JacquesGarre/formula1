import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MeetingDropdownComponent } from "../meeting-dropdown/meeting-dropdown.component";
import { SessionDropdownComponent } from "../session-dropdown/session-dropdown.component";
import { Driver } from '../../interfaces/driver';
import { DriversListComponent } from "../drivers-list/drivers-list.component";

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MeetingDropdownComponent, SessionDropdownComponent, DriversListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() drivers: Driver[] = [];
  @Output() driverToggled = new EventEmitter<number>();
  @Output() meetingChanged = new EventEmitter<number>();
  @Output() sessionChanged = new EventEmitter<number>();

  meetingKey: number | null = null;
  sessionKey: number | null = null;
  driverNumbers: number[] = [];

  onMeetingSelected(meetingKey: number) {
    console.log("sidebar - onMeetingSelected")
    this.meetingKey = meetingKey;
    this.meetingChanged.emit(meetingKey);
  }

  onSessionSelected(sessionKey: number) {
    console.log("sidebar - onSessionSelected")
    this.sessionKey = sessionKey;
    this.sessionChanged.emit(sessionKey);
  }

  onDriverToggled(driverNumber: number) {
    console.log("sidebar - onDriverToggled")
    const exists = this.driverNumbers.includes(driverNumber);
    if (exists) {
      this.driverNumbers = this.driverNumbers.filter(existingDriverNumber => existingDriverNumber !== driverNumber);
    } else {
      this.driverNumbers = [...this.driverNumbers, driverNumber];
    }
    this.driverToggled.emit(driverNumber);
  }
}
