import { Component } from '@angular/core';
import { MovieService } from 'app/shared/services/movies.service';
import { StudioWinnersComponent } from './studio-winners/studio-winners.component';
import { ProducerMinMaxComponent } from './producer-min-max/producer-min-max.component';
import { MovieWinnersYearComponent } from './movie-winners-year/movie-winners-year.component';
import { YearsMultipleWinnersComponent } from './years-multiple-winners/years-multiple-winners.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  imports: [
    StudioWinnersComponent,
    ProducerMinMaxComponent,
    MovieWinnersYearComponent,
    YearsMultipleWinnersComponent,
    TranslateModule,
  ],
  providers: [MovieService],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {  
}
