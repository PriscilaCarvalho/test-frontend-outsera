import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'environments/environment';
import {
  MoviesResponse,
  YearsWithMultipleWinnersResponse,
  Movie,
} from '../interfaces/movie';
import { StudiosWithWinCountResponse } from '../interfaces/studio';
import { ProducersIntervalResponse } from '../interfaces/producer';
import { MovieService } from './movies.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/movies`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies with default pagination', () => {
    const mockResponse: MoviesResponse = {
      content: [],
      totalElements: 0,
      numberOfElements: 0,
      totalPages: 0,
      number: 0,
      size: 10,
      first: true,
      last: true,
      pageable: {
        pageNumber: 0,
        pageSize: 10,
        offset: 0,
        paged: true,
        unpaged: false,
        sort: { sorted: false, unsorted: true }
      },
      sort: { sorted: false, unsorted: true }
    };

    service.getMovies().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}?page=0&size=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch movies with year and winner filters', () => {
    service.getMovies(1, 5, 2020, true).subscribe();

    const req = httpMock.expectOne(
      `${apiUrl}?page=1&size=5&year=2020&winner=true`
    );
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should fetch years with multiple winners', () => {
    const mockData: YearsWithMultipleWinnersResponse = {
      years: [{ year: 1980, winnerCount: 2 }]
    };

    service.getYearsWithMultipleWinners().subscribe((res) => {
      expect(res.years.length).toBe(1);
    });

    const req = httpMock.expectOne(`${apiUrl}?projection=years-with-multiple-winners`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch studios with win count', () => {
    const mockData: StudiosWithWinCountResponse = {
      studios: [{ name: 'Studio X', winCount: 3 }]
    };

    service.getStudiosWithWinCount().subscribe((res) => {
      expect(res.studios[0].name).toBe('Studio X');
    });

    const req = httpMock.expectOne(`${apiUrl}?projection=studios-with-win-count`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch producers with win interval', () => {
    const mockData: ProducersIntervalResponse = {
      max: [], min: []
    };

    service.getProducersWinInterval().subscribe((res) => {
      expect(res.max).toEqual([]);
      expect(res.min).toEqual([]);
    });

    const req = httpMock.expectOne(`${apiUrl}?projection=max-min-win-interval-for-producers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch winner by year', () => {
    const mockMovie: Movie = {
      id: 1,
      title: 'Winner Movie',
      year: 2021,
      studios: ['Studio A'],
      producers: ['Producer A'],
      winner: true
    };

    service.getWinnerByYear(2021).subscribe((res) => {
      expect(res.title).toBe('Winner Movie');
    });

    const req = httpMock.expectOne(`${apiUrl}?year=2021&winner=true`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovie);
  });
});
