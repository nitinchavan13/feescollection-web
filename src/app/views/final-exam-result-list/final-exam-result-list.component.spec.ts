import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalExamResultListComponent } from './final-exam-result-list.component';

describe('FinalExamResultListComponent', () => {
  let component: FinalExamResultListComponent;
  let fixture: ComponentFixture<FinalExamResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalExamResultListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalExamResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
