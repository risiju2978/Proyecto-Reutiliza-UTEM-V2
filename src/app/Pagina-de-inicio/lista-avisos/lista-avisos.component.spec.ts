import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAvisosComponent } from './lista-avisos.component';

describe('ListaAvisosComponent', () => {
  let component: ListaAvisosComponent;
  let fixture: ComponentFixture<ListaAvisosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaAvisosComponent]
    });
    fixture = TestBed.createComponent(ListaAvisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
