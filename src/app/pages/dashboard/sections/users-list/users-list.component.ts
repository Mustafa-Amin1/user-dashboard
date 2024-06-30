import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { user } from '../../types/user';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  constructor(private _api: HttpService) {}
  users: user[] = [];
  page: number = 1;
  totalPages: number = 0;
  isLoading: boolean = false;
  ngOnInit(): void {
    this.isLoading = true;
    this.getUsers();
  }
  getUsers(): void {
    this._api.getReq('/api/users', { params: { page: this.page } }).subscribe(
      (res) => {
        this.users = [...this.users, ...res.data];
        this.totalPages = res.total_pages;
        this.isLoading = false;
      },
      (err) => {
        //error handling
      }
    );
  }
  loadMoreUsers(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.page++;
      this.getUsers();
    }, 1000);
  }

  viewUser(userId: number): void {
    const menuElement = document.getElementById('user_menu');
    if (menuElement && menuElement.classList.contains('close')) {
      menuElement.classList.remove('close');
    } else {
      menuElement?.classList.add('close');
    }
  }

  deleteUser(userId: number): void {}
  editUser(userId: number): void {}

  trackByFn(index: number): number {
    return index;
  }
}
