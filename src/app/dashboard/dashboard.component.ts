// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Team, TeamService } from '../services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  teams: Team[] = [];
  token: string | null = null;

  constructor(private teamService: TeamService, private router: Router) {}

  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    if (!this.token) {
      this.router.navigate(['/login']);
    }
    this.getTeams();
  }

  getTeams(): void {
    if (this.token) {
      this.teamService
        .getTeams(this.token)
        .subscribe((teams) => (this.teams = teams));
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
}
