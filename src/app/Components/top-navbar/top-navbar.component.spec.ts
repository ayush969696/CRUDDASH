import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavbarComponent } from './top-navbar.component';
import { ToolbarModule } from 'primeng/toolbar';

describe('TopNavbarComponent', () => {
  let component: TopNavbarComponent;
  let fixture: ComponentFixture<TopNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopNavbarComponent,ToolbarModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
