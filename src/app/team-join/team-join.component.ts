// team-join.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TeamMembership,
  TeamMembershipService,
} from '../services/team-membership.service';

@Component({
  selector: 'app-team-join',
  templateUrl: './team-join.component.html',
  styleUrls: ['./team-join.component.scss'],
})
export class TeamJoinComponent implements OnInit {
  teamId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamMembershipService: TeamMembershipService
  ) {}

  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('teamId');
    if (this.teamId) {
      sessionStorage.setItem('join-team', this.teamId);
    }
    const token = sessionStorage.getItem('token');

    if (token) {
      this.joinTeam();
    } else {
      this.router.navigate(['/login']);
    }
  }

  joinTeam() {
    const playerId = parseInt(sessionStorage.getItem('id') ?? '-1');
    const isCaptain = false;
    const token = sessionStorage.getItem('token');

    if (token && playerId && this.teamId) {
      this.teamMembershipService
        .createTeamMembership(token, parseInt(this.teamId), playerId, isCaptain)
        .subscribe(
          (membership: TeamMembership) => {
            console.log('Team joined successfully!', membership);
            sessionStorage.removeItem('join-team');
            this.router.navigate([`/team/${this.teamId}`]);
          },
          (error) => {
            console.error('An error occurred while joining the team:', error);
          }
        );
    } else {
      console.error('No auth token found!');
      this.router.navigate(['/login']);
    }
  }
}
