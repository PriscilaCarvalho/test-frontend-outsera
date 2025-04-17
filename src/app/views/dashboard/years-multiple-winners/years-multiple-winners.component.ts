import { Component, OnInit } from '@angular/core';
import { YearsWithMultipleWinners } from 'app/shared/interfaces/movie';
import { MovieService } from 'app/shared/services/movies.service';
import { SharedModule } from 'app/shared/shared.module';
import { BehaviorSubject, Observable, switchMap, tap, map, startWith, catchError, of } from 'rxjs';

@Component({
  selector: 'app-years-multiple-winners',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './years-multiple-winners.component.html'
})
export class YearsMultipleWinnersComponent implements OnInit {
  yearsData$!: Observable<YearsWithMultipleWinners[]>;
  loading = false;

  private reload$ = new BehaviorSubject<void>(undefined);

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.setupYearsStream();
  }

  setupYearsStream() {
    this.yearsData$ = this.reload$.pipe(
      tap(() => (this.loading = true)),
      switchMap(() =>
        this.movieService.getYearsWithMultipleWinners().pipe(
          map(response => response.years),
          tap(() => (this.loading = false)),
          catchError(() => {
            this.loading = false;
            return of([]);
          })
        )
      ),
      startWith([])
    );
  }

  reload() {
    this.reload$.next();
  }
}
