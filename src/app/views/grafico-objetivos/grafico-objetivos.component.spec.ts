import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoObjetivosComponent } from './grafico-objetivos.component';

describe('GraficoObjetivosComponent', () => {
  let component: GraficoObjetivosComponent;
  let fixture: ComponentFixture<GraficoObjetivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoObjetivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoObjetivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
