import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface ChatResponse {
  message: string;
  timestamp: Date;
}

export interface ChatError {
  statusCode: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = `${environment.apiUrl}/Chat`;
  private headers = new HttpHeaders().set('X-API-Key', environment.apiKey);

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<string> {
    return this.http.post<ChatResponse>(this.apiUrl, { message }, { headers: this.headers })
      .pipe(
        map(response => response.message),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 429) {
            return throwError({
              statusCode: 429,
              message: 'Reached the daily limit of requests. Please try again tomorrow.'
            } as ChatError);
          }
          return throwError({
            statusCode: error.status,
            message: error.error?.message || 'An unexpected error occurred'
          } as ChatError);
        })
      );
  }
} 