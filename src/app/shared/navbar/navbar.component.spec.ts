import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        DropdownModule,
        FormsModule,
        TranslateModule.forRoot() 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should change language on dropdown selection', () => {
    spyOn(translateService, 'setDefaultLang').and.callThrough();
    spyOn(translateService, 'use');
    const newLang = { code: 'pt', label: 'Português' };
    const event = { value: newLang };

    component.onLanguageChange(event);

    expect(translateService.use).toHaveBeenCalledWith('pt');
  });
});
