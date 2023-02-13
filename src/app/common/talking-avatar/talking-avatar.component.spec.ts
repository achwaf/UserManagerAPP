import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkingAvatarComponent } from './talking-avatar.component';

describe('TalkingAvatarComponent', () => {
  let component: TalkingAvatarComponent;
  let fixture: ComponentFixture<TalkingAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalkingAvatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalkingAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
