import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Tfeet } from './tfeet';
import { MessageService } from './message.service';
import appConfig from '../assets/app-config.json';
import {User} from './user';


@Injectable({ providedIn: 'root' })
export class UserService {

  private apiUrl = appConfig.appBackend + '/register'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  /** POST: add a new tfeet to the server */
  addUser(user: User): Observable<any> | boolean {
    if (!user.username) {
      this.error('username cannot be empty!');
      return false;
    }

    if (!user.password) {
      this.error('password cannot be empty!');
      return false;
    }

    return this.http.post<any>(this.apiUrl, user, this.httpOptions).pipe(
      tap(() => this.log(`User registered.`)),
      catchError(this.handleError<any>('addUser'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a TfeetService message with the MessageService */
  private log(message: string) {
    this.messageService.add(message);
  }

  private error(message: string) {
    this.messageService.error(message);
  }
}
