import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLevelComponent } from './multi-level.component';

describe('MultiLevelComponent', () => {
  let component: MultiLevelComponent;
  let fixture: ComponentFixture<MultiLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiLevelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
