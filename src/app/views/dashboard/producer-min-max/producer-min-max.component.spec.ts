import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, firstValueFrom, skip } from 'rxjs';
import { ProducerMinMaxComponent } from './producer-min-max.component';
import { MovieService } from 'app/shared/services/movies.service';
import { ProducersIntervalResponse } from 'app/shared/interfaces/producer';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProducerMinMaxComponent', () => {
  let component: ProducerMinMaxComponent;
  let fixture: ComponentFixture<ProducerMinMaxComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  const mockResponse: ProducersIntervalResponse = {
    max: [
      {
        producer: 'Producer A',
        interval: 10,
        previousWin: 2000,
        followingWin: 2010,
      },
    ],
    min: [
      {
        producer: 'Producer B',
        interval: 1,
        previousWin: 2018,
        followingWin: 2019,
      },
    ],
  };

  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', [
      'getProducersWinInterval',
    ]);
    movieServiceSpy.getProducersWinInterval.and.returnValue(of(mockResponse));

    await TestBed.configureTestingModule({
      imports: [
        ProducerMinMaxComponent,
        HttpClientModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
      ],
      providers: [{ provide: MovieService, useValue: movieServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProducerMinMaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load producer data on init', async () => {
    const maxData = await firstValueFrom(
      component.maxProducerData$.pipe(skip(1))
    );
    expect(maxData.length).toBe(1);
    expect(maxData[0]).toEqual(mockResponse.max[0]);
  });

  it('should load min producer data on init', async () => {
    const minData = await firstValueFrom(
      component.minProducerData$.pipe(skip(1))
    );
    expect(minData.length).toBe(1);
    expect(minData[0]).toEqual(mockResponse.min[0]);
  });

  it('should call getProducersWinInterval on reload', () => {
    const callsBefore = movieServiceSpy.getProducersWinInterval.calls.count();

    component.reload();

    expect(
      movieServiceSpy.getProducersWinInterval.calls.count()
    ).toBeGreaterThan(callsBefore);
  });
});
