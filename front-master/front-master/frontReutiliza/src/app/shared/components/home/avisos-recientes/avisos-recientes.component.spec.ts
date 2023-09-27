import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisosRecientesComponent } from './avisos-recientes.component';

describe('AvisosRecientesComponent', () => {
  let component: AvisosRecientesComponent;
  let fixture: ComponentFixture<AvisosRecientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisosRecientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisosRecientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
