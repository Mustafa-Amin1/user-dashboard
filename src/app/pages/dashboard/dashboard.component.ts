import { Component } from '@angular/core';
import { BreadCrumbComponent } from 'src/app/shared/components/molecules/bread-crumb/bread-crumb.component';
import { breadCrumbArr } from 'src/app/shared/types/breadcrumbArr';
import { UsersListComponent } from './sections/users-list/users-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [BreadCrumbComponent, UsersListComponent],
})
export class DashboardComponent {
  breadCrumbLinks: breadCrumbArr[] = [
    {
      name: 'Home',
      url: '/home',
    },
    {
      name: 'Dashboard',
      url: '/#',
    },
  ];
}
