import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Game {
  location: string;
  opposingTeam: string;
  time: string;
  notes?: string;
  teamId: number;
  id: number;
}


@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:3000/api/games';

  constructor(private http: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Create Game
  createGame(game: Game, accessToken: string): Observable<Game> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${accessToken}`);
    return this.http.post<Game>(`${this.baseUrl}`, game, this.httpOptions);
  }

  // Get Game by ID
  getGameById(id: number, accessToken: string): Observable<Game> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<Game>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  // Get All Games
  getAllGames(accessToken: string): Observable<Game[]> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<Game[]>(`${this.baseUrl}`, this.httpOptions);
  }

  // Update Game
  updateGame(id: number, game: Game, accessToken: string): Observable<Game> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${accessToken}`);
    return this.http.put<Game>(`${this.baseUrl}/${id}`, game, this.httpOptions);
  }

  // Delete Game
  deleteGame(id: number, accessToken: string): Observable<Game> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${accessToken}`);
    return this.http.delete<Game>(`${this.baseUrl}/${id}`, this.httpOptions);
  }
}
