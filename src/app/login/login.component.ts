// login.component.ts
import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  token: string | null = null;
  error: string | null = null;

  constructor(private playerService: PlayerService) {}

  onSubmit() {
    this.playerService.login(this.email, this.password).subscribe(
      (response) => {
        this.token = response.token;
        sessionStorage.setItem('token', this.token);
      },
      (error) => {
        this.error = error.message;
      }
    );
  }
}
