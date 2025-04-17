import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-layout',
  imports: [        
    CommonModule,
    RouterModule,
    SidebarComponent,
    NavbarComponent,
    ToastModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
