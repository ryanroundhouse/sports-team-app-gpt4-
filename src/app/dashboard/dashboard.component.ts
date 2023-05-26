import { Component, OnInit } from '@angular/core';
import { Team, TeamService } from '../services/team.service';
import { Router } from '@angular/router';
import {
  TeamMembership,
  TeamMembershipService,
} from '../services/team-membership.service';
import { catchError, finalize } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
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
    private playerService: PlayerService,
    private teamMembershipService: TeamMembershipService
  ) {}

  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    if (!this.token) {
      this.router.navigate(['/login']);
    }
    this.getPlayerTeamMemberships();
  }

  getPlayerTeamMemberships(): void {
    if (this.token) {
      const playerId = parseInt(sessionStorage.getItem('id') || '', 10);
      this.playerService
        .getTeamMembershipsByPlayer(this.token, playerId)
        .pipe(
          catchError((error) => {
            console.error(
              'Error occurred while fetching team memberships: ',
              error
            );
            return of([]);
          })
        )
        .subscribe((teamMemberships) => {
          this.teamMemberships = teamMemberships;
          this.getTeams();
        });
    }
  }

  getTeams(): void {
    if (this.token) {
      const teamIds = this.teamMemberships.map(
        (membership) => membership.teamId
      );
      this.teamService
        .getTeams(this.token)
        .pipe(
          catchError((error) => {
            console.error('Error occurred while fetching teams: ', error);
            return of([]);
          })
        )
        .subscribe((teams) => {
          this.teams = teams.filter((team) => teamIds.includes(team.id));
        });
    }
  }

  onTeamCreated(): void {
    this.getPlayerTeamMemberships();
  }

  deleteTeam(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this team?');
    if (confirmDelete) {
      const token = sessionStorage.getItem('token');
      if (token) {
        this.teamService
          .deleteTeam(token, id)
          .pipe(
            catchError((error) => {
              console.error(
                `Error occurred while deleting team ${id}: `,
                error
              );
              return of(null);
            })
          )
          .subscribe(() => {
            this.teams = this.teams.filter((team) => team.id !== id);
            this.getPlayerTeamMemberships(); // Refresh memberships
          });
      }
    }
  }

  isCaptain(teamId: number): boolean {
    const membership = this.teamMemberships.find(
      (membership) => membership.teamId === teamId
    );
    return membership ? membership.isCaptain : false;
  }

  findTeamById(teamId: number): Team | null {
    return this.teams.find((team) => team.id === teamId) || null;
  }
}
