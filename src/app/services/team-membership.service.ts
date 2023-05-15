// team-membership.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TeamMembership {
  id: number;
  teamId: number;
  playerId: number;
  isCaptain: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TeamMembershipService {
  private baseUrl = 'http://localhost:3000/api/teams';

  constructor(private http: HttpClient) {}

  private getAuthHeader(token: string): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  createTeamMembership(
    token: string,
    teamId: number,
    playerId: number,
    isCaptain: boolean
  ): Observable<TeamMembership> {
    const headers = this.getAuthHeader(token);
    return this.http.post<TeamMembership>(
      `${this.baseUrl}/${teamId}/team-memberships`,
      { playerId, isCaptain },
      { headers }
    );
  }

  getTeamMemberships(
    token: string,
    teamId: number
  ): Observable<TeamMembership[]> {
    const headers = this.getAuthHeader(token);
    return this.http.get<TeamMembership[]>(
      `${this.baseUrl}/${teamId}/team-memberships`,
      { headers }
    );
  }

  getTeamMembership(
    token: string,
    teamId: number,
    id: number
  ): Observable<TeamMembership> {
    const headers = this.getAuthHeader(token);
    return this.http.get<TeamMembership>(
      `${this.baseUrl}/${teamId}/team-memberships/${id}`,
      { headers }
    );
  }

  updateTeamMembership(
    token: string,
    teamId: number,
    id: number,
    playerId: number,
    isCaptain: boolean
  ): Observable<TeamMembership> {
    const headers = this.getAuthHeader(token);
    return this.http.put<TeamMembership>(
      `${this.baseUrl}/${teamId}/team-memberships/${id}`,
      { playerId, isCaptain },
      { headers }
    );
  }

  deleteTeamMembership(
    token: string,
    teamId: number,
    id: number
  ): Observable<TeamMembership> {
    const headers = this.getAuthHeader(token);
    return this.http.delete<TeamMembership>(
      `${this.baseUrl}/${teamId}/team-memberships/${id}`,
      { headers }
    );
  }
}
