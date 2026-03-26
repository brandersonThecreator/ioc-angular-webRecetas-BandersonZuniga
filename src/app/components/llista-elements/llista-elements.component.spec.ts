import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LlistaElementsComponent } from "./llista-elements.component";

describe("LlistaElementsComponent", () => {
  let component: LlistaElementsComponent;
  let fixture: ComponentFixture<LlistaElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlistaElementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LlistaElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
