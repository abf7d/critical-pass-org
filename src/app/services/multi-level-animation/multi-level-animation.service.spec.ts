import { TestBed } from '@angular/core/testing';

import { MultiLevelAnimationService } from './multi-level-animation.service';

describe('MultiLevelAnimationService', () => {
  let service: MultiLevelAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiLevelAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
