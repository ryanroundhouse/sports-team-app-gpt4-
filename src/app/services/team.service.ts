// team.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Team {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private baseUrl = 'http://localhost:3000/api/teams';

  constructor(private http: HttpClient) {}

  private getAuthHeader(token: string): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  createTeam(token: string, name: string): Observable<Team> {
    const headers = this.getAuthHeader(token);
    return this.http.post<Team>(this.baseUrl, { name }, { headers });
  }

  getTeams(token: string): Observable<Team[]> {
    const headers = this.getAuthHeader(token);
    return this.http.get<Team[]>(this.baseUrl, { headers });
  }

  getTeamById(id: number, token: string): Observable<Team> {
    const headers = this.getAuthHeader(token);
    return this.http.get<Team>(`${this.baseUrl}/${id}`, { headers });
  }

  updateTeam(token: string, id: number, name: string): Observable<Team> {
    const headers = this.getAuthHeader(token);
    return this.http.put<Team>(`${this.baseUrl}/${id}`, { name }, { headers });
  }

  deleteTeam(token: string, id: number): Observable<Team> {
    const headers = this.getAuthHeader(token);
    return this.http.delete<Team>(`${this.baseUrl}/${id}`, { headers });
  }
}
