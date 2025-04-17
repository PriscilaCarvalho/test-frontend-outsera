import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Language } from '../interfaces/language';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SelectModule, FormsModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {  
  languages: Language[] = [    
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' }
  ];

  selectedLanguage: Language = this.languages[0];

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.selectedLanguage.code);
    this.translate.use(this.selectedLanguage.code);
  }

  onLanguageChange(event: any): void {
    const lang: Language = event.value;
    this.translate.use(lang.code);
  }
}
