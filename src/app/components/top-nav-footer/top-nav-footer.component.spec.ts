import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavFooterComponent } from './top-nav-footer.component';

describe('TopNavFooterComponent', () => {
  let component: TopNavFooterComponent;
  let fixture: ComponentFixture<TopNavFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopNavFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopNavFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
