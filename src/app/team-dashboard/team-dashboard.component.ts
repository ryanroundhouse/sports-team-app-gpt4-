// team-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  TeamMembership,
  TeamMembershipService,
} from '../services/team-membership.service';
import { Player, PlayerService } from '../services/player.service';
import { Team, TeamService } from '../services/team.service';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.scss'],
})
export class TeamDashboardComponent implements OnInit {
  team: Team | null = null;
  teamMemberships: TeamMembership[] = [];
  players: Player[] = [];
  token: string | null = null;
  teamJoinUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private teamMembershipService: TeamMembershipService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.getTeam(this.token, id);
      this.getTeamMemberships(this.token, id);
    }
  }

  getTeam(token: string, id: number): void {
    this.token = sessionStorage.getItem('token');
    if (token) {
      this.teamService.getTeamById(id, token).subscribe((team) => {
        this.team = team;
        this.teamJoinUrl = `${location.protocol}//${location.host}/join-team/${this.team.id}`;
      });
    }
  }

  getTeamMemberships(token: string, id: number): void {
    this.teamMembershipService
      .getTeamMemberships(token, id)
      .subscribe((memberships) => {
        this.teamMemberships = memberships;
        this.getPlayers();
      });
  }
  getPlayers(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.players = [];
      this.teamMemberships.map((membership) =>
        this.playerService
          .getById(token, membership.playerId)
          .subscribe((player) => {
            this.players.push(player);
          })
      );
    }
  }

  createTeamMembership(playerId: number, isCaptain: boolean): void {
    if (this.token && this.team) {
      this.teamMembershipService
        .createTeamMembership(this.token, this.team.id, playerId, isCaptain)
        .subscribe((newMembership) => {
          this.teamMemberships.push(newMembership);
        });
    }
  }

  updateTeamMembership(id: number, playerId: number, isCaptain: boolean): void {
    if (this.token && this.team) {
      this.teamMembershipService
        .updateTeamMembership(this.token, this.team.id, id, playerId, isCaptain)
        .subscribe((updatedMembership) => {
          const index = this.teamMemberships.findIndex((m) => m.id === id);
          if (index !== -1) {
            this.teamMemberships[index] = updatedMembership;
          }
        });
    }
  }

  deleteTeamMembership(id: number): void {
    if (this.token && this.team) {
      this.teamMembershipService
        .deleteTeamMembership(this.token, this.team.id, id)
        .subscribe(() => {
          this.teamMemberships = this.teamMemberships.filter(
            (m) => m.id !== id
          );
        });
    }
  }

  isCaptain(): boolean {
    const playerId = parseInt(sessionStorage.getItem('id') || '', 10);
    const membership = this.teamMemberships.find(
      (membership) =>
        membership.teamId === this.team?.id && membership.playerId === playerId
    );
    return membership ? membership.isCaptain : false;
  }
}
