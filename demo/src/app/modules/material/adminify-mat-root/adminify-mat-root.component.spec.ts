import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminifyMatRootComponent } from './adminify-mat-root.component';

describe('AdminifyMatRootComponent', () => {
  let component: AdminifyMatRootComponent;
  let fixture: ComponentFixture<AdminifyMatRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminifyMatRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminifyMatRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
