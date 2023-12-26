import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightfooterComponent } from './copyrightfooter.component';

describe('CopyrightfooterComponent', () => {
  let component: CopyrightfooterComponent;
  let fixture: ComponentFixture<CopyrightfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyrightfooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyrightfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
