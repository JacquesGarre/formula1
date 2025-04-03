import { Component, EventEmitter, Output } from '@angular/core';
import { Meeting } from '../../interfaces/meeting';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meeting-dropdown',
  imports: [CommonModule],
  templateUrl: './meeting-dropdown.component.html',
  styleUrl: './meeting-dropdown.component.css'
})
export class MeetingDropdownComponent {
  @Output() meetingSelected = new EventEmitter<number>();

  meetings: Meeting[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Meeting[]>(`${environment.openF1ApiUrl}/meetings`).subscribe((data) => {
      this.meetings = data.sort((a, b) =>
        new Date(b.date_start).getTime() - new Date(a.date_start).getTime()
      );
    });
  }

  onSelect(event: Event): void {
    const key = Number((event.target as HTMLSelectElement).value);
    this.meetingSelected.emit(key);
  }
}
