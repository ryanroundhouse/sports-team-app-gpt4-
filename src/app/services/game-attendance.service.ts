// game-attendance.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Attendance {
  id: number;
  gameId: number;
  playerId: number;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class GameAttendanceService {
  private readonly BASE_URL = 'http://localhost:3000/api/attendance';

  constructor(private http: HttpClient) {}

  createAttendance(
    token: string,
    gameId: number,
    playerId: number,
    status: string
  ): Observable<Attendance> {
    const url = `${this.BASE_URL}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Attendance>(
      url,
      { gameId, playerId, status },
      { headers }
    );
  }

  getAllAttendances(token: string): Observable<Attendance[]> {
    const url = `${this.BASE_URL}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Attendance[]>(url, { headers });
  }

  getAttendanceById(token: string, id: number): Observable<Attendance> {
    const url = `${this.BASE_URL}/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Attendance>(url, { headers });
  }

  updateAttendance(
    token: string,
    id: number,
    gameId: number,
    playerId: number,
    status: string
  ): Observable<Attendance> {
    const url = `${this.BASE_URL}/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Attendance>(
      url,
      { gameId, playerId, status },
      { headers }
    );
  }

  deleteAttendance(token: string, id: number): Observable<Attendance> {
    const url = `${this.BASE_URL}/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Attendance>(url, { headers });
  }
}
