// game-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game, GameService } from '../services/game.service';
import { Player, PlayerService } from '../services/player.service';
import {
  Attendance,
  GameAttendanceService,
} from '../services/game-attendance.service';
import {
  TeamMembership,
  TeamMembershipService,
} from '../services/team-membership.service';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.sass'],
})
export class GameDashboardComponent implements OnInit {
  game: Game | null = null;
  attendance: Attendance[] = [];
  teamMembership: TeamMembership | null = null;
  players: Player[] = [];

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private playerService: PlayerService,
    private teamMembershipService: TeamMembershipService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getGame(id);
    this.getGameAttendances(id);
    this.getAllPlayers();
  }

  getGame(id: number): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.gameService.getGameById(id, token).subscribe((game) => {
        this.game = game;
        this.getTeamMembership();
      });
    }
  }

  getTeamMembership(): void {
    const token = sessionStorage.getItem('token');
    const playerId = parseInt(sessionStorage.getItem('id') || '', 10);
    const teamId = this.game?.teamId;

    if (teamId && token) {
      this.teamMembershipService
        .getTeamMemberships(token, teamId)
        .subscribe((teamMemberships) => {
          const teamMembership = teamMemberships.find(
            (membership) => membership.playerId === playerId
          );
          if (teamMembership) {
            this.teamMembership = teamMembership;
          }
        });
    }
  }

  isCaptain(): boolean {
    if (this.teamMembership) {
      return this.teamMembership.isCaptain;
    }
    return false;
  }

  getGameAttendances(id: number): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.gameService
        .getGameAttendancesById(id, token)
        .subscribe((attendances) => (this.attendance = attendances));
    }
  }

  getAllPlayers(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.playerService
        .getAll(token)
        .subscribe((players) => (this.players = players));
    }
  }

  getPlayerName(playerId: number): string | undefined {
    const player = this.players.find((player) => player.id === playerId);
    return player ? player.name : undefined;
  }
}
