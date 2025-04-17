import { Pageable, Sort } from './pagination';

export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface MoviesResponse {
  content: Movie[];
  pageable: Pageable;
  totalElements: number;
  last: boolean;
  totalPages: number;
  first: boolean;
  sort: Sort;
  number: number;
  numberOfElements: number;
  size: number;
}

export interface YearsWithMultipleWinners {
  year: number;
  winnerCount: number;
}

export interface YearsWithMultipleWinnersResponse {
  years: YearsWithMultipleWinners[];
}

export interface MovieFilter {
  year: string;
  winner: string;
}
