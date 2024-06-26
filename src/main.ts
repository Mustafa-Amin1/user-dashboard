import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { NavbarComponent } from './app/shared/components/molecules/navbar/navbar.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./app/pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./app/pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./app/pages/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [provideRouter(routes) ,provideHttpClient()],
});
