import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRepairsComponent } from './user-repairs.component';

describe('UserRepairsComponent', () => {
  let component: UserRepairsComponent;
  let fixture: ComponentFixture<UserRepairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRepairsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
