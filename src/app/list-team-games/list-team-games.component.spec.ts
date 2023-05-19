import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTeamGamesComponent } from './list-team-games.component';

describe('ListTeamGamesComponent', () => {
  let component: ListTeamGamesComponent;
  let fixture: ComponentFixture<ListTeamGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTeamGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTeamGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
