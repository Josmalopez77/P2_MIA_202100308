import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent2 } from './register-user.component';

describe('RegisterUserComponent', () => {
  let component: RegistroComponent2;
  let fixture: ComponentFixture<RegistroComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
