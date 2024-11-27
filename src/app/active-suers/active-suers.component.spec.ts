import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSuersComponent } from './active-suers.component';

describe('ActiveSuersComponent', () => {
  let component: ActiveSuersComponent;
  let fixture: ComponentFixture<ActiveSuersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveSuersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveSuersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
