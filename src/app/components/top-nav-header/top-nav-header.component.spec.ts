import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavHeaderComponent } from './top-nav-header.component';

describe('TopNavHeaderComponent', () => {
  let component: TopNavHeaderComponent;
  let fixture: ComponentFixture<TopNavHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopNavHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopNavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
