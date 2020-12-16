import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Tfeet } from './tfeet';
import { MessageService } from './message.service';
import appConfig from '../assets/app-config.json';


@Injectable({ providedIn: 'root' })
export class TfeetService {

  private apiUrl = appConfig.appBackend + '/tfeet'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET tfeets from the server */
  getTfeets(): Observable<Tfeet[]> {
    return this.http.get<Tfeet[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log('Tfeets fetched.')),
        catchError(this.handleError<Tfeet[]>('getTfeets', []))
      );
  }

  // /** GET hero by id. Return `undefined` when id not found */
  // getTfeetNo404<Data>(id: number): Observable<Tfeet> {
  //   const url = `${this.apiUrl}/?id=${id}`;
  //   return this.http.get<Tfeet[]>(url)
  //     .pipe(
  //       map(tfeets => tfeets[0]), // returns a {0|1} element array
  //       tap(h => {
  //         const outcome = h ? `fetched` : `did not find`;
  //         this.log(`${outcome} hero id=${id}`);
  //       }),
  //       catchError(this.handleError<Tfeet>(`getTfeet id=${id}`))
  //     );
  // }

  /** GET hero by id. Will 404 if id not found */
  getTfeet(id: string): Observable<Tfeet> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Tfeet>(url).pipe(
      tap(_ => this.log(`Loaded Tfeet: ${id}`)),
      catchError(this.handleError<Tfeet>(`getTfeet id=${id}`))
    );
  }

  /* GET tfeets whose name contains search term */
  // searchtfeetes(term: string): Observable<Tfeet[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty tfeet array.
  //     return of([]);
  //   }
  //   return this.http.get<Tfeet[]>(`${this.apiUrl}/?name=${term}`).pipe(
  //     tap(x => x.length ?
  //        this.log(`found tfeetes matching "${term}"`) :
  //        this.log(`no tfeetes matching "${term}"`)),
  //     catchError(this.handleError<Tfeet[]>('searchtfeetes', []))
  //   );
  // }

  //////// Save methods //////////

  /** POST: add a new tfeet to the server */
  addTfeet(tfeet: Tfeet): Observable<any> {
    return this.http.post<any>(this.apiUrl, tfeet, this.httpOptions).pipe(
      tap(() => this.log(`Tfeet added.`)),
      catchError(this.handleError<any>('addTfeet'))
    );
  }

  /** DELETE: delete the tfeet from the server */
  deleteTfeet(tfeet: Tfeet | string): Observable<Tfeet> {
    const id = typeof tfeet === 'string' ? tfeet : tfeet.id;
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<Tfeet>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Tfeet removed: ${id}`)),
      catchError(this.handleError<Tfeet>('deleteTfeet'))
    );
  }

  // /** PUT: update the tfeet on the server */
  // updateTfeet(tfeet: Tfeet): Observable<any> {
  //   return this.http.put(this.apiUrl, tfeet, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated tfeet id=${tfeet.id}`)),
  //     catchError(this.handleError<any>('updateTfeet'))
  //   );
  // }

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
