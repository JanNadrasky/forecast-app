import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDialog } from './dialog.component';

describe('DialogComponent', () => {
  let component: WeatherDialog;
  let fixture: ComponentFixture<WeatherDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
