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

  /** GET heroes from the server */
  getTfeets(): Observable<Tfeet[]> {
    return this.http.get<Tfeet[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log('fetched tfeets')),
        catchError(this.handleError<Tfeet[]>('getTfeets', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getTfeetNo404<Data>(id: number): Observable<Tfeet> {
    const url = `${this.apiUrl}/?id=${id}`;
    return this.http.get<Tfeet[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Tfeet>(`getHero id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getTfeet(id: string): Observable<Tfeet> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Tfeet>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Tfeet>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Tfeet[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Tfeet[]>(`${this.apiUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Tfeet[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addTfeet(hero: Tfeet): Observable<Tfeet> {
    return this.http.post<Tfeet>(this.apiUrl, hero, this.httpOptions).pipe(
      tap((newHero: Tfeet) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Tfeet>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteTfeet(tfeet: Tfeet | number): Observable<Tfeet> {
    const id = typeof tfeet === 'number' ? tfeet : tfeet.id;
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<Tfeet>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Tfeet>('deleteHero'))
    );
  }

  // /** PUT: update the hero on the server */
  // updateTfeet(hero: Tfeet): Observable<any> {
  //   return this.http.put(this.apiUrl, hero, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${hero.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
