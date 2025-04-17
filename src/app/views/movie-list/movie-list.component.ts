import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Observable,
  map,
  BehaviorSubject,
  combineLatest,
  switchMap,
  catchError,
  of,
} from 'rxjs';
import { SharedModule } from 'app/shared/shared.module';
import { Movie, MovieFilter } from 'app/shared/interfaces/movie';
import { MovieService } from 'app/shared/services/movies.service';
import { FilterService } from 'app/shared/services/filter.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [SharedModule, FormsModule],
  providers: [FilterService],
  templateUrl: './movie-list.component.html',
})
export class MovieListComponent {
  movies$!: Observable<Movie[]>;
  totalRecords: number = 0;
  loading = false;

  pageNumber = 0;
  rows = 10;
  first = 0;

  filterModel: MovieFilter = {
    year: '',
    winner: '',
  };

  private reload$ = new BehaviorSubject<void>(undefined);

  winnerOptions = [
    { label: 'DROPDOWN_OPTION_ALL', value: '' },
    { label: 'DROPDOWN_OPTION_YES', value: 'true' },
    { label: 'DROPDOWN_OPTION_NO', value: 'false' },
  ];

  constructor(
    private movieService: MovieService,
    private filterService: FilterService
  ) {
    this.setupMoviesStream();
  }

  setupMoviesStream() {
    this.movies$ = combineLatest([
      this.filterService.year$,
      this.filterService.winner$,
      this.reload$,
    ]).pipe(
      switchMap(([year, winner]) => {
        const yearFilter = year || undefined;
        const winnerFilter = winner === '' ? undefined : winner === 'true';

        this.loading = true;

        return this.movieService.getMovies(
          this.pageNumber,
          this.rows,
          yearFilter,
          winnerFilter
        );
      }),
      map((data) => {
        this.totalRecords = data.totalElements;
        this.rows = data.numberOfElements;
        this.loading = false;
        return data.content;
      }),
      catchError(() => {
        this.loading = false;
        return of([]);
      })
    );
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.pageNumber = event.page;
    this.rows = event.rows;
    this.reload$.next();
  }

  filter(field: keyof MovieFilter, value: string) {
    if (field === 'year')
      this.filterService.setYear(value ? Number(value) : null);
    if (field === 'winner') this.filterService.setWinner(value);
    this.resetFilter();
    this.reload$.next();
  }

  resetFilter() {
    this.pageNumber = 0;
    this.rows = 10;
    this.first = 0;
  }
}
