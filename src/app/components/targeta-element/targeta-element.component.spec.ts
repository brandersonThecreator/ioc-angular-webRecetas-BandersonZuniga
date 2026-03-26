import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetaElementComponent } from './targeta-element.component';

describe('TargetaElementComponent', () => {
  let component: TargetaElementComponent;
  let fixture: ComponentFixture<TargetaElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetaElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetaElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
