import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../services/team.service';
import { Game, GameService } from '../services/game.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-team-games',
  templateUrl: './list-team-games.component.html',
  styleUrls: ['./list-team-games.component.sass'],
})
export class ListTeamGamesComponent implements OnInit {
  private _team: Team | null = null;

  @Input()
  set team(value: Team | null) {
    this._team = value;
    if (value) {
      this.loadTeamGames(value.id);
    }
  }

  get team(): Team | null {
    return this._team;
  }

  games: Game[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {}

  loadTeamGames(teamId: number): void {
    const accessToken = sessionStorage.getItem('token');
    if (accessToken) {
      this.gameService.getAllGames(accessToken).subscribe((games) => {
        this.games = games.filter((game) => game.teamId === teamId);
        this.games.sort(
          (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
        );
      });
    }
  }

  refreshGames(): void {
    if (this.team) {
      this.loadTeamGames(this.team.id);
    }
  }

  deleteGame(gameId: number): void {
    const accessToken = sessionStorage.getItem('token');
    if (accessToken) {
      this.gameService.deleteGame(gameId, accessToken).subscribe(() => {
        this.games = this.games.filter((game) => game.id !== gameId);
      });
    }
  }
}
