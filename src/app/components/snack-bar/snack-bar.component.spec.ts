import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSnackBarModule, MAT_SNACK_BAR_DATA } from '@angular/material';

import { SnackBarComponent } from './snack-bar.component';

describe('SnackBarComponent', () => {
  let component: SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatSnackBarModule ],
      declarations: [ SnackBarComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [{
        provide: MAT_SNACK_BAR_DATA,
        useValue: {}
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
