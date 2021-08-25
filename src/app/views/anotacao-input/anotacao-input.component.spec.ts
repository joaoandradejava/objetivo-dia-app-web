import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotacaoInputComponent } from './anotacao-input.component';

describe('AnotacaoInputComponent', () => {
  let component: AnotacaoInputComponent;
  let fixture: ComponentFixture<AnotacaoInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnotacaoInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotacaoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
