import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEquipsComponent } from './login-equips.component';

describe('LoginEquipsComponent', () => {
  let component: LoginEquipsComponent;
  let fixture: ComponentFixture<LoginEquipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginEquipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginEquipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
