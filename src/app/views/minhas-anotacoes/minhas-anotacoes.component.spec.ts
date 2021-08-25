import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasAnotacoesComponent } from './minhas-anotacoes.component';

describe('MinhasAnotacoesComponent', () => {
  let component: MinhasAnotacoesComponent;
  let fixture: ComponentFixture<MinhasAnotacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinhasAnotacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasAnotacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
