import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../services/team.service';
import { Game, GameService } from '../services/game.service';
import {
  Attendance,
  GameAttendanceService,
} from '../services/game-attendance.service';

@Component({
  selector: 'app-list-team-games',
  templateUrl: './list-team-games.component.html',
  styleUrls: ['./list-team-games.component.scss'],
})
export class ListTeamGamesComponent implements OnInit {
  private _team: Team | null = null;
  attendances: Attendance[] = [];

  @Input() canDelete: boolean = false;
  @Input() canConfirm: boolean = false;

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

  constructor(
    private gameService: GameService,
    private attendanceService: GameAttendanceService,
    private gameAttendanceService: GameAttendanceService
  ) {}

  ngOnInit(): void {
    this.getAttendances();
  }

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

  getAttendanceStatus(gameId: number): string | null {
    const id = sessionStorage.getItem('id') ?? '';
    const attendance = this.attendances.find(
      (a) => a.gameId === gameId && a.playerId === parseInt(id)
    );
    return attendance ? attendance.status : null;
  }

  getAttendances(): void {
    const playerId = sessionStorage.getItem('id') ?? '';
    const accessToken = sessionStorage.getItem('token');
    if (accessToken) {
      this.gameAttendanceService
        .getAllAttendances(accessToken)
        .subscribe((attendanceRecords) => {
          this.attendances = attendanceRecords.filter(
            (record) => record.playerId === parseInt(playerId)
          );
        });
    }
    console.log(`att: ${JSON.stringify(this.attendances)}`);
  }

  handleConfirmAttendance(gameId: number): void {
    this.handleAttendance(gameId, 'confirm');
  }

  handleAbsentAttendance(gameId: number): void {
    this.handleAttendance(gameId, 'absent');
  }

  handleAttendance(gameId: number, status: string) {
    const accessToken = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('id') ?? '';
    if (!accessToken) {
      return;
    }

    this.attendanceService
      .getAllAttendances(accessToken)
      .subscribe((attendances) => {
        const attendance = attendances.find(
          (a) => a.gameId === gameId && a.playerId === parseInt(id)
        );
        if (attendance) {
          this.attendanceService
            .updateAttendance(
              accessToken,
              attendance.id,
              gameId,
              parseInt(id),
              status
            )
            .subscribe(() => {
              this.getAttendances();
            });
        } else {
          this.attendanceService
            .createAttendance(accessToken, gameId, parseInt(id), status)
            .subscribe(() => {
              this.getAttendances();
            });
        }
      });
  }

  refreshGames(): void {
    if (this.team) {
      this.loadTeamGames(this.team.id);
    }
  }

  deleteGame(gameId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this game?');
    if (confirmDelete) {
      const accessToken = sessionStorage.getItem('token');
      if (accessToken) {
        this.gameService.deleteGame(gameId, accessToken).subscribe(() => {
          this.games = this.games.filter((game) => game.id !== gameId);
        });
      }
    }
  }
}
