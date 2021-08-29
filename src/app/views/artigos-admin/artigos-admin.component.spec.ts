import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtigosAdminComponent } from './artigos-admin.component';

describe('ArtigosAdminComponent', () => {
  let component: ArtigosAdminComponent;
  let fixture: ComponentFixture<ArtigosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtigosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtigosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
