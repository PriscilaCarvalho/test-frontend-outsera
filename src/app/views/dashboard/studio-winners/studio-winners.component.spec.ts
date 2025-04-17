import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, firstValueFrom, filter } from 'rxjs';
import { StudioWinnersComponent } from './studio-winners.component';
import { MovieService } from 'app/shared/services/movies.service';
import { StudiosWithWinCountResponse } from 'app/shared/interfaces/studio';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StudioWinnersComponent', () => {
  let component: StudioWinnersComponent;
  let fixture: ComponentFixture<StudioWinnersComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  const mockResponse: StudiosWithWinCountResponse = {
    studios: [
      { name: 'Studio A', winCount: 5 },
      { name: 'Studio B', winCount: 7 },
      { name: 'Studio C', winCount: 2 },
      { name: 'Studio D', winCount: 8 },
      { name: 'Studio E', winCount: 3 }
    ]
  };

  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', ['getStudiosWithWinCount']);
    movieServiceSpy.getStudiosWithWinCount.and.returnValue(of(mockResponse));

    await TestBed.configureTestingModule({
      imports: [
        StudioWinnersComponent,
        HttpClientModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule
      ],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudioWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and display top 3 studios sorted by winCount', async () => {
    const data = await firstValueFrom(
      component.studiosData$.pipe(filter(d => d.length > 0))
    );
    expect(data.length).toBe(3);
    expect(data[0].name).toBe('Studio D');
    expect(data[1].name).toBe('Studio B');
    expect(data[2].name).toBe('Studio A');
  });
  
  it('should trigger reload and fetch studios again', () => {
    movieServiceSpy.getStudiosWithWinCount.calls.reset();
    component.reload();
    expect(movieServiceSpy.getStudiosWithWinCount).toHaveBeenCalledTimes(1);
  });
});
