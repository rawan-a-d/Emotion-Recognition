import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionDetectionComponent } from './emotion-detection.component';

describe('EmotionDetectionComponent', () => {
  let component: EmotionDetectionComponent;
  let fixture: ComponentFixture<EmotionDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmotionDetectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
