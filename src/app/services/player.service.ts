import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Player {
  id?: number;
  name: string;
  email: string;
  cellphone: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private baseUrl = 'http://localhost:3000/api/players';

  constructor(private http: HttpClient) {}

  private getAuthHeader(token: string): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  register(player: Player): Observable<Player> {
    console.log(`sending message to ${this.baseUrl}`);
    return this.http.post<Player>(`${this.baseUrl}`, player);
  }

  login(
    email: string,
    password: string
  ): Observable<{ player: Player; token: string }> {
    return this.http.post<{ player: Player; token: string }>(
      `${this.baseUrl}/login`,
      { email, password }
    );
  }

  getAll(token: string): Observable<Player[]> {
    const headers = this.getAuthHeader(token);
    return this.http.get<Player[]>(`${this.baseUrl}`, { headers });
  }

  getById(token: string, id: number): Observable<Player> {
    const headers = this.getAuthHeader(token);
    return this.http.get<Player>(`${this.baseUrl}/${id}`, { headers });
  }

  update(
    token: string,
    id: number,
    player: Partial<Player>
  ): Observable<Player> {
    const headers = this.getAuthHeader(token);
    return this.http.put<Player>(`${this.baseUrl}/${id}`, player, { headers });
  }

  delete(token: string, id: number): Observable<Player> {
    const headers = this.getAuthHeader(token);
    return this.http.delete<Player>(`${this.baseUrl}/${id}`, { headers });
  }
}
