import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenceListComponent } from './expence-list.component';

describe('ExpenceListComponent', () => {
  let component: ExpenceListComponent;
  let fixture: ComponentFixture<ExpenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
