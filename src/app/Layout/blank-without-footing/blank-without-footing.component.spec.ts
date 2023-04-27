import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankWithoutFootingComponent } from './blank-without-footing.component';

describe('BlankWithoutFootingComponent', () => {
  let component: BlankWithoutFootingComponent;
  let fixture: ComponentFixture<BlankWithoutFootingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankWithoutFootingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankWithoutFootingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
