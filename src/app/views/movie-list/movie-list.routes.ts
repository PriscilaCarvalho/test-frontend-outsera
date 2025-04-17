import { Routes } from '@angular/router';
import { MovieListComponent } from './movie-list.component';


export const movieListRoutes: Routes = [
  {
    path: '',
    component: MovieListComponent,
    children: [{ path: 'movie-list', component: MovieListComponent }],
  },
];
