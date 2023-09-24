import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarcionDePublicacionesComponent } from './administrarcion-de-publicaciones.component';

describe('AdministrarcionDePublicacionesComponent', () => {
  let component: AdministrarcionDePublicacionesComponent;
  let fixture: ComponentFixture<AdministrarcionDePublicacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarcionDePublicacionesComponent]
    });
    fixture = TestBed.createComponent(AdministrarcionDePublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
