import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FilterService {
  year$ = new BehaviorSubject<number | null>(null);
  winner$ = new BehaviorSubject<string>('');

  setYear(year: number | null) {
    this.year$.next(year);
  }

  setWinner(winner: string) {
    this.winner$.next(winner);
  }
}
