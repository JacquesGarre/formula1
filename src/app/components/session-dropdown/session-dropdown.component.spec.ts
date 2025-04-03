import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDropdownComponent } from './session-dropdown.component';

describe('SessionDropdownComponent', () => {
  let component: SessionDropdownComponent;
  let fixture: ComponentFixture<SessionDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
