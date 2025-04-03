import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingDropdownComponent } from './meeting-dropdown.component';

describe('MeetingDropdownComponent', () => {
  let component: MeetingDropdownComponent;
  let fixture: ComponentFixture<MeetingDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
