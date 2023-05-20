// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Team, TeamService } from '../services/team.service';
import { Router } from '@angular/router';
import {
  TeamMembership,
  TeamMembershipService,
} from '../services/team-membership.service';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  teams: Team[] = [];
  teamMemberships: TeamMembership[] = [];
  token: string | null = null;

  constructor(
    private teamService: TeamService,
    private router: Router,
    private teamMembershipService: TeamMembershipService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    if (!this.token) {
      this.router.navigate(['/login']);
    }
    this.getTeams();
  }

  getTeams(): void {
    if (this.token) {
      const playerId = parseInt(sessionStorage.getItem('id') || '', 10);
      this.playerService
        .getTeamMembershipsByPlayer(this.token, playerId)
        .subscribe((teamMemberships) => {
          const teamIds = teamMemberships.map(
            (membership) => membership.teamId
          );
          console.log(`memberships: ${teamMemberships}`);
          if (this.token) {
            this.teamService.getTeams(this.token).subscribe((teams) => {
              this.teams = teams.filter((team) => teamIds.includes(team.id));
            });
          }
        });
    }
  }

  getTeamMemberships(): void {
    if (this.token) {
      const requests = this.teams.map((team) =>
        this.teamMembershipService.getTeamMemberships(
          this.token as string,
          team.id
        )
      );
      forkJoin(requests).subscribe((responses) => {
        this.teamMemberships = ([] as TeamMembership[]).concat(...responses);
      });
    }
  }

  onTeamCreated(): void {
    this.getTeams();
  }

  deleteTeam(id: number): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.teamService.deleteTeam(token, id).subscribe(() => {
        this.teams = this.teams.filter((team) => team.id !== id);
      });
    }
  }

  findTeamById(teamId: number): Team | null {
    return this.teams.find((team) => team.id === teamId) || null;
  }
}
