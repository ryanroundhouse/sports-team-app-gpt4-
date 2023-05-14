import { Component } from '@angular/core';
import { Player, PlayerService } from '../services/player.service';

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
})
export class ListPlayersComponent {
  players: Player[] = [];
  error: string | null = null;

  constructor(private playerService: PlayerService) {}

  loadPlayers() {
    const token = sessionStorage.getItem('token');

    if (!token) {
      this.error = 'No token found. Please log in.';
      return;
    }

    this.playerService.getAll(token).subscribe(
      (players) => {
        this.players = players;
      },
      (error) => {
        this.error = error.message;
      }
    );
  }
}
