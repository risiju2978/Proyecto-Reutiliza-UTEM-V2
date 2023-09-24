import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarAvisoComponent } from './publicar-aviso.component';

describe('PublicarAvisoComponent', () => {
  let component: PublicarAvisoComponent;
  let fixture: ComponentFixture<PublicarAvisoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicarAvisoComponent]
    });
    fixture = TestBed.createComponent(PublicarAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
