import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMapComponent } from './customer-map.component';

describe('CustomerMapComponent', () => {
  let component: CustomerMapComponent;
  let fixture: ComponentFixture<CustomerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
