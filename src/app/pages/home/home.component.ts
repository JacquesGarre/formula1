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
  driverNumbers: number[] = [];

  onMeetingChanged(meetingKey: number) {
    console.log("home - onMeetingChanged")
    this.meetingKey = meetingKey;
    this.sessionKey = null;
    this.driverNumbers = [];
  }

  onSessionChanged(sessionKey: number) {
    console.log("home - onSessionChanged")
    this.sessionKey = sessionKey;
    this.driverNumbers = [];
  }

  onDriverToggled(driverNumber: number) {
    console.log("home - onDriverToggled")
    const exists = this.driverNumbers.includes(driverNumber);
    if (exists) {
      this.driverNumbers = this.driverNumbers.filter(existingDriverNumber => existingDriverNumber !== driverNumber);
    } else {
      this.driverNumbers = [...this.driverNumbers, driverNumber];
    }
  }
}
