import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnMoreBannerComponent } from './learn-more-banner.component';

describe('LearnMoreBannerComponent', () => {
  let component: LearnMoreBannerComponent;
  let fixture: ComponentFixture<LearnMoreBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnMoreBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnMoreBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
