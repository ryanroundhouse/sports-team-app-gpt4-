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
  styleUrls: ['./team-join.component.sass'],
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
    const token = sessionStorage.getItem('token');

    if (token) {
      this.joinTeam();
    } else {
      this.router.navigate(['/login']);
    }
  }

  joinTeam() {
    // Assume the logged-in user's ID is stored in a service or sessionStorage
    const playerId = parseInt(sessionStorage.getItem('id') ?? '-1');
    const isCaptain = false; // Assume the user is not a captain
    const token = sessionStorage.getItem('token');

    if (token && playerId && this.teamId) {
      this.teamMembershipService
        .createTeamMembership(token, parseInt(this.teamId), playerId, isCaptain)
        .subscribe(
          (membership: TeamMembership) => {
            console.log('Team joined successfully!', membership);
            // Navigate to the team's dashboard
            this.router.navigate([`/team/${this.teamId}`]);
          },
          (error) => {
            console.error('An error occurred while joining the team:', error);
            // Handle the error (e.g., show an error message to the user)
          }
        );
    } else {
      console.error('No auth token found!');
      // Handle the error (e.g., redirect to the login page)
      this.router.navigate(['/login']);
    }
  }
}
