import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Session } from '../../interfaces/session';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-dropdown',
  imports: [CommonModule],
  templateUrl: './session-dropdown.component.html',
  styleUrl: './session-dropdown.component.css'
})
export class SessionDropdownComponent {
  @Input() meetingKey: number | null = null;
  @Output() sessionSelected = new EventEmitter<number>();

  sessions: Session[] = [];

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.sessions = [];
    if (changes['meetingKey'] && this.meetingKey !== null) {
      this.fetchSessions(this.meetingKey);
    }
  }

  fetchSessions(meetingKey: number): void {
    this.http
      .get<Session[]>(`${environment.openF1ApiUrl}/sessions?meeting_key=${meetingKey}`)
      .subscribe((data) => {
        this.sessions = data;
      });
  }

  onSelect(event: Event): void {
    const key = Number((event.target as HTMLSelectElement).value);
    this.sessionSelected.emit(key);
  }
}
