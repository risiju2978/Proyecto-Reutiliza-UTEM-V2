import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarcionDeUsuariosComponent } from './administrarcion-de-usuarios.component';

describe('AdministrarcionDeUsuariosComponent', () => {
  let component: AdministrarcionDeUsuariosComponent;
  let fixture: ComponentFixture<AdministrarcionDeUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarcionDeUsuariosComponent]
    });
    fixture = TestBed.createComponent(AdministrarcionDeUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
