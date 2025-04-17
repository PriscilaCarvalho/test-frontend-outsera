import { Component, OnInit } from '@angular/core';
import { StudiosWithWinCount } from 'app/shared/interfaces/studio';
import { MovieService } from 'app/shared/services/movies.service';
import { SharedModule } from 'app/shared/shared.module';
import { Observable, map, tap, startWith, BehaviorSubject, switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-studio-winners',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './studio-winners.component.html',
})
export class StudioWinnersComponent implements OnInit {
  studiosData$!: Observable<StudiosWithWinCount[]>;
  loading = false;

  private reload$ = new BehaviorSubject<void>(undefined);

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.setupStudiosStream();
  }

  setupStudiosStream() {
    this.studiosData$ = this.reload$.pipe(
      tap(() => (this.loading = true)),
      switchMap(() =>
        this.movieService.getStudiosWithWinCount().pipe(
          map((response) =>
            response.studios
              .sort((a, b) => b.winCount - a.winCount)
              .slice(0, 3)
          ),
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
