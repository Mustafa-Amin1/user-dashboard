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
  selectedUser!: user | null;

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

  openUserMenu(): void {
    const menuElement = document.getElementById('user_menu');
    const tableElement = document.getElementById('users_table');
    if (tableElement) tableElement.style.borderTopRightRadius = '0px';
    if (tableElement) tableElement.style.borderBottomRightRadius = '0px';
    if (menuElement) menuElement?.classList.remove('close');
    if (menuElement) menuElement?.classList.remove('p-0');
  }
  closeUserMenu(): void {
    const menuElement = document.getElementById('user_menu');
    const tableElement = document.getElementById('users_table');
    if (tableElement) tableElement.style.borderTopRightRadius = '10px';
    if (tableElement) tableElement.style.borderBottomRightRadius = '10px';
    menuElement?.classList.add('close');
    menuElement?.classList.add('p-0');
  }
  viewUser(userId: number): void {
    //should use ngrx to check if user get called before
    if (this.selectedUser && this.selectedUser.id == userId) {
      this.openUserMenu();
      return;
    }
    this._api.getReq(`/api/users/${userId}`).subscribe(
      (res) => {
        this.selectedUser = null;
        this.selectedUser = res.data;
        console.log(this.selectedUser);
        setTimeout(() => {
          this.openUserMenu();
        }, 0);
      },
      (err) => {
        //error handling
      }
    );
  }

  deleteUser(userId: number): void {}
  editUser(userId: number): void {}

  trackByFn(index: number): number {
    return index;
  }
}
