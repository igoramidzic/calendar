import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDisplaynameComponent } from './update-displayname.component';

describe('UpdateDisplaynameComponent', () => {
  let component: UpdateDisplaynameComponent;
  let fixture: ComponentFixture<UpdateDisplaynameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDisplaynameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDisplaynameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
