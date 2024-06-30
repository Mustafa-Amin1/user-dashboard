import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { loginResponse } from 'src/app/shared/types/authTypes';
import { AuthService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    email: ['eve.holt@reqres.in', [Validators.required, Validators.minLength(4)]],
    password: ['cityslicka', [Validators.required, Validators.minLength(8)]],
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _auth: AuthService,
    private _api: HttpService,
  ) {
    // init login form
    this.loginForm = this.fb.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.minLength(4)]],
      password: ['cityslicka', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void { }

  login() {
    if (this.loginForm.valid) {
      this._api.postReq('/api/login', this.loginForm.value).subscribe((res: loginResponse) => {
        this._auth.setUserToken(res?.token);
        this.router.navigate(['/dashboard']);
        //TODO:: save token in cookies or state management
      }, err => {
        console.log(err)
        //TODO:: notification
      })
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
}
