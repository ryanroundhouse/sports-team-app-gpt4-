import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { TeamJoinComponent } from './team-join/team-join.component';
import { GameDashboardComponent } from './game-dashboard/game-dashboard.component';
import { CreateTeamComponent } from './create-team/create-team.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'team/:id', component: TeamDashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'join-team/:teamId', component: TeamJoinComponent },
  { path: 'game/:id', component: GameDashboardComponent },
  { path: 'create-team', component: CreateTeamComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
