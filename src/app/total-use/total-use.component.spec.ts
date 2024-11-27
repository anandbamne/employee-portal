import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalUseComponent } from './total-use.component';

describe('TotalUseComponent', () => {
  let component: TotalUseComponent;
  let fixture: ComponentFixture<TotalUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalUseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
