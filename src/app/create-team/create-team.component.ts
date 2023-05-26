// create-team.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { TeamService } from '../services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent {
  teamName: string = '';

  @Output() teamCreated = new EventEmitter();

  constructor(private teamService: TeamService, private router: Router) {}

  createTeam(): void {
    const token = sessionStorage.getItem('token');
    if (token && this.teamName) {
      this.teamService.createTeam(token, this.teamName).subscribe(
        () => {
          this.teamName = '';
          this.teamCreated.emit();
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // handle error here, maybe display a user-friendly message
          console.error(error);
        }
      );
    }
  }
}
