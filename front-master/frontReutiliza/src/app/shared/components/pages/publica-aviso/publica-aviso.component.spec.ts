import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicaAvisoComponent } from './publica-aviso.component';

describe('PublicaAvisoComponent', () => {
  let component: PublicaAvisoComponent;
  let fixture: ComponentFixture<PublicaAvisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicaAvisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicaAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
