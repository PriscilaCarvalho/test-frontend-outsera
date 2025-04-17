import { Component, OnInit } from '@angular/core';
import {
  ProducerInterval,
  ProducersIntervalResponse,
} from 'app/shared/interfaces/producer';
import { MovieService } from 'app/shared/services/movies.service';
import { SharedModule } from 'app/shared/shared.module';
import { BehaviorSubject, Observable, switchMap, map, tap, startWith } from 'rxjs';

@Component({
  selector: 'app-producer-min-max',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './producer-min-max.component.html',
})
export class ProducerMinMaxComponent implements OnInit {
  maxProducerData$!: Observable<ProducerInterval[]>;
  minProducerData$!: Observable<ProducerInterval[]>;
  loading = false;

  private reload$ = new BehaviorSubject<void>(undefined);

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.setupProducerStream();
  }

  setupProducerStream() {
    const data$ = this.reload$.pipe(
      tap(() => (this.loading = true)),
      switchMap(() =>
        this.movieService.getProducersWinInterval().pipe(
          tap(() => (this.loading = false)),
          startWith({ max: [], min: [] } as ProducersIntervalResponse),          
        )
      )
    );

    this.maxProducerData$ = data$.pipe(map((data) => data.max));
    this.minProducerData$ = data$.pipe(map((data) => data.min));
  }

  reload() {
    this.reload$.next();
  }
}
