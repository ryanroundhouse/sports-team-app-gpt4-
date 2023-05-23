import { Component, OnInit } from '@angular/core';
import { Team, TeamService } from '../services/team.service';
import { Router } from '@angular/router';
import {
  TeamMembership,
  TeamMembershipService,
} from '../services/team-membership.service';
import { map, catchError, finalize } from 'rxjs/operators';
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
          const teamIds = teamMemberships.map(
            (membership) => membership.teamId
          );
          console.log(`memberships: ${teamMemberships}`);
          if (this.token) {
            this.teamService
              .getTeams(this.token)
              .pipe(
                catchError((error) => {
                  console.error('Error occurred while fetching teams: ', error);
                  return of([]);
                }),
                finalize(() => {
                  this.getTeamMemberships();
                })
              )
              .subscribe((teams) => {
                this.teams = teams.filter((team) => teamIds.includes(team.id));
              });
          }
        });
    }
  }

  getTeamMemberships(): void {
    if (this.token) {
      const playerId = parseInt(sessionStorage.getItem('id') || '', 10);
      const requests = this.teams.map((team) =>
        this.playerService
          .getTeamMembershipsByPlayer(this.token as string, playerId)
          .pipe(
            catchError((error) => {
              console.error(
                `Error occurred while fetching team memberships for team ${team.id}: `,
                error
              );
              return of([]);
            })
          )
      );
      forkJoin(requests).subscribe((responses) => {
        console.log(
          `membership was: ${JSON.stringify(
            this.teamMemberships
          )} response is: ${JSON.stringify(responses)}`
        );
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
      this.teamService
        .deleteTeam(token, id)
        .pipe(
          catchError((error) => {
            console.error(`Error occurred while deleting team ${id}: `, error);
            return of(null);
          })
        )
        .subscribe(() => {
          this.teams = this.teams.filter((team) => team.id !== id);
        });
    }
  }

  findTeamById(teamId: number): Team | null {
    return this.teams.find((team) => team.id === teamId) || null;
  }
}
