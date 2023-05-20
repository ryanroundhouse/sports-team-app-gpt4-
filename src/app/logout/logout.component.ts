// logout.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent {
  constructor(private router: Router) {
    this.logout();
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
