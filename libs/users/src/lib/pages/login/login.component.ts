import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmited = false;
  authFailed = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private messageService: MessageService, private location: Location, private router: Router,
    private localService: LocalStorageService) { }

  ngOnInit(): void {
    this._initLoginForm();
  }
  private _initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  get getLoginForm() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.loginForm.invalid) return;
    console.log(this.loginForm)
    const loginData = {
      email: this.loginForm?.value.email || '',
      password: this.loginForm?.value.password || ''
    }
    this.authService.logIn(loginData).subscribe(
      (res) => {
        this.authFailed = false;
        this.localService.setItem(res.token || '')
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Success' });
        this.router.navigate(['/']);
      }, (error: HttpErrorResponse) => {
        if (error.status !== 400) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error in the server.please try again' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login Failed' });
        }
        this.isSubmited = false;
        this.authFailed = true;

      }
    )
  }
}
