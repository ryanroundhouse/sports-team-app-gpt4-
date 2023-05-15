import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Player, PlayerService } from '../services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cellphone: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    console.log(`submit`);
    if (this.registerForm.valid) {
      console.log(`valid`);
      const player: Player = {
        name: this.registerForm.value.name ?? '',
        email: this.registerForm.value.email ?? '',
        cellphone: this.registerForm.value.cellphone ?? '',
        password: this.registerForm.value.password ?? '',
      };
      this.playerService.register(player).subscribe({
        next: (player: Player) => {
          this.successMessage = 'Registration successful!';
          this.errorMessage = null;
          this.registerForm.reset();
          console.log(`success`);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage =
            'An error occurred during registration. Please try again.';
          this.successMessage = null;
          console.error(error);
        },
      });
    }
    console.log(`done`);
  }
}
