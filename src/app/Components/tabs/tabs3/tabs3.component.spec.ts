import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tabs3Component } from './tabs3.component';

describe('Tabs3Component', () => {
  let component: Tabs3Component;
  let fixture: ComponentFixture<Tabs3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tabs3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tabs3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
