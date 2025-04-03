import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackViewerComponent } from './track-viewer.component';

describe('TrackViewerComponent', () => {
  let component: TrackViewerComponent;
  let fixture: ComponentFixture<TrackViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
