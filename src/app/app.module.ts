import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ListPlayersComponent } from './list-players/list-players.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { ListTeamGamesComponent } from './list-team-games/list-team-games.component';
import { LogoutComponent } from './logout/logout.component';
import { TeamJoinComponent } from './team-join/team-join.component';
import { GameDashboardComponent } from './game-dashboard/game-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ListPlayersComponent,
    DashboardComponent,
    CreateTeamComponent,
    TeamDashboardComponent,
    CreateGameComponent,
    ListTeamGamesComponent,
    LogoutComponent,
    TeamJoinComponent,
    GameDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
