// create-team.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.sass'],
})
export class CreateTeamComponent {
  teamName: string = '';

  @Output() teamCreated = new EventEmitter();

  constructor(private teamService: TeamService) {}

  createTeam(): void {
    const token = sessionStorage.getItem('token');
    if (token && this.teamName) {
      this.teamService.createTeam(token, this.teamName).subscribe(
        () => {
          this.teamName = '';
          this.teamCreated.emit();
        },
        (error) => {
          // handle error here, maybe display a user-friendly message
          console.error(error);
        }
      );
    }
  }
}
