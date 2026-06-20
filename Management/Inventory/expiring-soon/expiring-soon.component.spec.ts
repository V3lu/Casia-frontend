import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiringSoonComponent } from './expiring-soon.component';

describe('ExpiringSoonComponent', () => {
  let component: ExpiringSoonComponent;
  let fixture: ComponentFixture<ExpiringSoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpiringSoonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiringSoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
