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
  @Output() meetingSelected = new EventEmitter<number>();
  @Output() sessionSelected = new EventEmitter<number>();

  meetingKey: number | null = null;
  sessionKey: number | null = null;

  onMeetingSelected(meetingKey: number) {
    this.meetingKey = meetingKey;
  }

  onSessionSelected(sessionKey: number) {
    this.sessionKey = sessionKey;
  }

}
