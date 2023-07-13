import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduceReutilizaReciclaComponent } from './reduce-reutiliza-recicla.component';

describe('ReduceReutilizaReciclaComponent', () => {
  let component: ReduceReutilizaReciclaComponent;
  let fixture: ComponentFixture<ReduceReutilizaReciclaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReduceReutilizaReciclaComponent]
    });
    fixture = TestBed.createComponent(ReduceReutilizaReciclaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
