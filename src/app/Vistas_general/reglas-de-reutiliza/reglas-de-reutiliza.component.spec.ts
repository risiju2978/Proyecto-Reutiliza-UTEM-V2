import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglasDeReutilizaComponent } from './reglas-de-reutiliza.component';

describe('ReglasDeReutilizaComponent', () => {
  let component: ReglasDeReutilizaComponent;
  let fixture: ComponentFixture<ReglasDeReutilizaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReglasDeReutilizaComponent]
    });
    fixture = TestBed.createComponent(ReglasDeReutilizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
