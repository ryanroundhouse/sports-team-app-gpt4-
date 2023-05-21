// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  id: number = 0;
  token: string | null = null;
  error: string | null = null;

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.playerService.login(this.email, this.password).subscribe(
      (response) => {
        this.token = response.token;
        this.error = null;
        sessionStorage.setItem('token', this.token);
        sessionStorage.setItem('id', response.id);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.error = error.message;
      }
    );
  }
}
