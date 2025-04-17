import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBar } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { TranslateModule } from '@ngx-translate/core';

const primeModules = [
  PanelModule,
  TableModule,
  InputTextModule,
  DropdownModule,
  ButtonModule,
  PaginatorModule,
  TagModule,
  SelectModule,
  MultiSelectModule,
  ProgressBar,
  ButtonModule,
  IconFieldModule,
  InputIconModule,
  ProgressSpinnerModule,
  ToastModule,
];

@NgModule({
  imports: [CommonModule, TranslateModule, ...primeModules],
  exports: [CommonModule, TranslateModule, ...primeModules],
})
export class SharedModule {}
