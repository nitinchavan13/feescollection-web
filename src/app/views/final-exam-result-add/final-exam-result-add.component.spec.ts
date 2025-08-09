import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalExamResultAddComponent } from './final-exam-result-add.component';

describe('FinalExamResultAddComponent', () => {
  let component: FinalExamResultAddComponent;
  let fixture: ComponentFixture<FinalExamResultAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalExamResultAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalExamResultAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
