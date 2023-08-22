import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmovieComponent } from './addmovie.component';

describe('AddmovieComponent', () => {
  let component: AddmovieComponent;
  let fixture: ComponentFixture<AddmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
