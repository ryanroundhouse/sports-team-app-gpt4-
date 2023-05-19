import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game, GameService } from '../services/game.service';
import { Team } from '../services/team.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.sass']
})
export class CreateGameComponent implements OnInit {

  private _team: Team | null = null;

  @Output() gameCreated = new EventEmitter<void>();

  @Input() 
  set team(value: Team | null) {
    this._team = value;
    if(value){
      this.game.teamId = value.id;
    }
  }

  get team(): Team | null {
    return this._team;
  }
  
  game: Game = {
    location: '',
    opposingTeam: '',
    time: '',
    notes: '',
    teamId: 0,
    id: 0,
  };

  constructor(private gameService: GameService) { }

  ngOnInit(): void {

  }

  submitGame(): void {
    
    const token = sessionStorage.getItem('token');
    if (token && this.game) {

    this.gameService.createGame(this.game, token)
      .subscribe(
        response => {
          console.log(response);
          this.gameCreated.emit();
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}
