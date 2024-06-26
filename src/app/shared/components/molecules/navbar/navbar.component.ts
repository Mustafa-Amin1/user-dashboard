import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [NgIf, RouterLinkActive, RouterLink],
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AuthService) {}
  isLoggedIn: boolean = false;
  ngOnInit(): void {
    this.auth.checkUserAuth();
    this.auth.isAuth.subscribe((res) => {
      this.isLoggedIn = res;
    });
  }
}
