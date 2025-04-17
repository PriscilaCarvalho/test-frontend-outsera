import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Movie, MoviesResponse, YearsWithMultipleWinnersResponse } from '../interfaces/movie';
import { StudiosWithWinCountResponse } from '../interfaces/studio';
import { ProducersIntervalResponse } from '../interfaces/producer';

@Injectable({
  providedIn: 'root',
})

export class MovieService {
  private readonly apiUrl = `${environment.apiUrl}/movies`

  constructor(private http: HttpClient) {}

   getMovies(page: number = 0, size: number = 10, year?: number, winner?: boolean): Observable<MoviesResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (year) {
      params = params.set('year', year.toString());
    }
    if (winner !== undefined) {
      params = params.set('winner', winner.toString());
    }

    return this.http.get<MoviesResponse>(this.apiUrl, { params });
  }

  getYearsWithMultipleWinners(): Observable<YearsWithMultipleWinnersResponse> {
    return this.http.get<YearsWithMultipleWinnersResponse>(`${this.apiUrl}?projection=years-with-multiple-winners`);
  }

  getStudiosWithWinCount(): Observable<StudiosWithWinCountResponse> {
    return this.http.get<StudiosWithWinCountResponse>(`${this.apiUrl}?projection=studios-with-win-count`);
  }

  getProducersWinInterval(): Observable<ProducersIntervalResponse> {
    return this.http.get<ProducersIntervalResponse>(`${this.apiUrl}?projection=max-min-win-interval-for-producers`);
  }

  getWinnerByYear(year: number): Observable<Movie> {
    const params = new HttpParams()
      .set('year', year.toString())
      .set('winner', 'true');
    return this.http.get<Movie>(this.apiUrl, { params });
  }
}
