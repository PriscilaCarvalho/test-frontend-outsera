import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError, BehaviorSubject, firstValueFrom } from 'rxjs';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from 'app/shared/services/movies.service';
import { FilterService } from 'app/shared/services/filter.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesResponse } from 'app/shared/interfaces/movie';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  let filterServiceMock: Partial<FilterService>;

  const mockMoviesResponse: MoviesResponse = {
    content: [
      {
        id: 1,
        year: 2020,
        title: 'Mock Movie',
        producers: ['Producer A'],
        studios: ['Studio A'],
        winner: true,
      },
    ],
    numberOfElements: 1,
    totalElements: 1,
    totalPages: 1,
    number: 0,
    size: 10,
    first: true,
    last: true,
    pageable: {
      sort: { sorted: false, unsorted: true },
      pageNumber: 0,
      pageSize: 10,
      offset: 0,
      paged: true,
      unpaged: false,
    },
    sort: { sorted: false, unsorted: true },
  };

  let yearSubject = new BehaviorSubject<number | null>(null);
  let winnerSubject = new BehaviorSubject<string>('');

  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovies']);
    movieServiceSpy.getMovies.and.returnValue(of(mockMoviesResponse));

    filterServiceMock = {
      year$: yearSubject,
      winner$: winnerSubject,
      setYear: (val: number | null) => yearSubject.next(val),
      setWinner: (val: string) => winnerSubject.next(val)
    };

    await TestBed.configureTestingModule({
      imports: [
        MovieListComponent,
        HttpClientModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: FilterService, useValue: filterServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies from service into stream', async () => {
    const movies = await firstValueFrom(component.movies$);
    expect(movies.length).toBe(1);
    expect(movies[0].title).toBe('Mock Movie');
    expect(component.totalRecords).toBe(1);
    expect(component.rows).toBe(1);
    expect(component.loading).toBeFalse();
  });

  it('should update pagination and trigger reload on onPageChange()', async () => {
    movieServiceSpy.getMovies.calls.reset();
    component.onPageChange({ first: 20, rows: 20, page: 2 });    
    expect(component.first).toBe(20);
    expect(component.rows).toBe(1);
    expect(component.pageNumber).toBe(2);
    expect(movieServiceSpy.getMovies).toHaveBeenCalled();
  });

  it('should apply year filter and reload data', async () => {
    spyOn(component, 'resetFilter').and.callThrough();
    component.filter('year', '2021');
    const movies = await firstValueFrom(component.movies$);
    expect(component.pageNumber).toBe(0);
    expect(component.rows).toBe(1);
    expect(component.first).toBe(0);
    expect(component.resetFilter).toHaveBeenCalled();
    expect(movies.length).toBe(1);
  });

  it('should apply winner filter and reload data', async () => {
    spyOn(component, 'resetFilter').and.callThrough();
    component.filter('winner', 'true');
    const movies = await firstValueFrom(component.movies$);
    expect(component.pageNumber).toBe(0);
    expect(component.rows).toBe(1);
    expect(component.first).toBe(0);
    expect(component.resetFilter).toHaveBeenCalled();
    expect(movies.length).toBe(1);
  });

  it('should handle error gracefully and continue with empty list', async () => {
    movieServiceSpy.getMovies.and.returnValue(
      throwError(() => new Error('Simulated error'))
    );
  
    component['reload$'].next();
    const result = await firstValueFrom(component.movies$);
  
    expect(result).toEqual([]); 
    expect(component.loading).toBeFalse(); 
  });
  
});
