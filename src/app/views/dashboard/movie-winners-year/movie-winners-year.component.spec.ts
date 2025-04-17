import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, BehaviorSubject } from 'rxjs';
import { MovieWinnersYearComponent } from './movie-winners-year.component';
import { MovieService } from 'app/shared/services/movies.service';
import { FilterService } from 'app/shared/services/filter.service';
import { Movie } from 'app/shared/interfaces/movie';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MovieWinnersYearComponent', () => {
  let component: MovieWinnersYearComponent;
  let fixture: ComponentFixture<MovieWinnersYearComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  let filterServiceMock: Partial<FilterService>;
  let yearSubject: BehaviorSubject<number | null>;

  const mockMovie: Movie = {
    id: 1,
    year: 2020,
    title: 'Movie A',
    studios: ['Studio A'],
    producers: ['Producer A'],
    winner: true,
  };

  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', ['getWinnerByYear']);
    movieServiceSpy.getWinnerByYear.and.returnValue(of(mockMovie));

    yearSubject = new BehaviorSubject<number | null>(null);

    filterServiceMock = {
      year$: yearSubject,
      setYear: (val: number | null) => yearSubject.next(val),
    };

    await TestBed.configureTestingModule({
      imports: [
        MovieWinnersYearComponent,
        HttpClientModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: FilterService, useValue: filterServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieWinnersYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit empty array if year is null', (done) => {
    yearSubject.next(null);

    component.winners$.subscribe((data) => {
      expect(data).toEqual([]);
      done();
    });
  });

  it('should load winner data when year is emitted', (done) => {
    component.selectedYear = 2020;
    component.searchWinners();

    setTimeout(() => {
      component.winners$.subscribe((data) => {
        expect(movieServiceSpy.getWinnerByYear).toHaveBeenCalledWith(2020);
        expect(data.length).toBe(1);
        expect(data[0].title).toBe('Movie A');
        done();
      });
    });
  });

  it('should transform single movie to array', (done) => {
    const response: Movie = {
      id: 2,
      title: 'Movie B',
      year: 2021,
      producers: ['Producer B'],
      studios: ['Studio B'],
      winner: true,
    };

    movieServiceSpy.getWinnerByYear.and.returnValue(of(response));
    component.selectedYear = 2021;
    component.searchWinners();

    setTimeout(() => {
      component.winners$.subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data[0].title).toBe('Movie B');
        done();
      });
    });
  });
});
