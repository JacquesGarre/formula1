import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { TrackViewerComponent } from "../../components/track-viewer/track-viewer.component";

@Component({
  selector: 'app-home',
  imports: [SidebarComponent, TrackViewerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  meetingKey: number | null = null;
  sessionKey: number | null = null;
  selectedDrivers: number[] = [];

  onMeetingChanged(meetingKey: number) {
    this.meetingKey = meetingKey;
    this.sessionKey = null;
    this.selectedDrivers = [];
  }

  onSessionChanged(sessionKey: number) {
    this.sessionKey = sessionKey;
    this.selectedDrivers = [];
  }

  onDriverToggled(driverNumber: number) {
    const exists = this.selectedDrivers.includes(driverNumber);
    if (exists) {
      this.selectedDrivers = this.selectedDrivers.filter(existingDriverNumber => existingDriverNumber !== driverNumber);
    } else {
      this.selectedDrivers = [...this.selectedDrivers, driverNumber];
    }
  }
}
