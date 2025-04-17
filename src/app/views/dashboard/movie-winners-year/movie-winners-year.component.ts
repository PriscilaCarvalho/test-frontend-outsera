import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, of, switchMap, map, tap, catchError } from 'rxjs';
import { SharedModule } from 'app/shared/shared.module';
import { Movie } from 'app/shared/interfaces/movie';
import { MovieService } from 'app/shared/services/movies.service';
import { FilterService } from 'app/shared/services/filter.service';

@Component({
  selector: 'app-movie-winners-year',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './movie-winners-year.component.html',
  styleUrls: ['./movie-winners-year.component.scss'],
  providers: [FilterService],
})
export class MovieWinnersYearComponent {
  winners$!: Observable<Movie[]>;
  selectedYear!: number;
  loading = false;

  constructor(
    private movieService: MovieService,
    private filterService: FilterService
  ) {
    this.winners$ = this.filterService.year$.pipe(
      tap(() => (this.loading = true)),
      switchMap((year) => {
        if (!year) {
          this.loading = false;
          return of([]);
        }
        return this.movieService.getWinnerByYear(year).pipe(
          map((data: Movie | Movie[]) => (Array.isArray(data) ? data : [data])),
          tap(() => (this.loading = false)),
          catchError(() => {
            this.loading = false;
            return of([]);
          })
        );
      })
    );
  }

  searchWinners() {
    const year = this.selectedYear ? Number(this.selectedYear) : null;
    this.filterService.setYear(year);
  }
}
