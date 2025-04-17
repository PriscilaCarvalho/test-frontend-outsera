import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YearsMultipleWinnersComponent } from './years-multiple-winners.component';
import { MovieService } from 'app/shared/services/movies.service';
import { YearsWithMultipleWinnersResponse } from 'app/shared/interfaces/movie';
import { filter, firstValueFrom, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('YearsMultipleWinnersComponent', () => {
  let component: YearsMultipleWinnersComponent;
  let fixture: ComponentFixture<YearsMultipleWinnersComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  const mockResponse: YearsWithMultipleWinnersResponse = {
    years: [
      { year: 1980, winnerCount: 2 },
      { year: 1995, winnerCount: 3 },
      { year: 2010, winnerCount: 2 },
    ],
  };

  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', [
      'getYearsWithMultipleWinners',
    ]);
    movieServiceSpy.getYearsWithMultipleWinners.and.returnValue(
      of(mockResponse)
    );

    await TestBed.configureTestingModule({
      imports: [
        YearsMultipleWinnersComponent,
        HttpClientModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
      ],
      providers: [{ provide: MovieService, useValue: movieServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(YearsMultipleWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and display years with multiple winners', async () => {
    const data = await firstValueFrom(
      component.yearsData$.pipe(filter((d) => d.length > 0))
    );
    
    expect(movieServiceSpy.getYearsWithMultipleWinners).toHaveBeenCalled();
    expect(data.length).toBe(3);
    expect(data[0].year).toBe(1980);
    expect(data[1].winnerCount).toBe(3);            
  });

  it('should call getYearsWithMultipleWinners again on reload', () => {
    movieServiceSpy.getYearsWithMultipleWinners.calls.reset();
    component.reload();
    expect(movieServiceSpy.getYearsWithMultipleWinners).toHaveBeenCalledTimes(
      1
    );
  });
});
