import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@frontend/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';

declare const require: (arg0: string) => countriesLib.LocaleData;
@Component({
  selector: 'admin-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  edditMode = false;
  isSubmited = false;
  currentId = '';
  countries: { id: string, name: string }[] = [];
  constructor(private formBuilder: FormBuilder,
    private userService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      isAdmin: [false, Validators.required],
      street: ['', Validators.required],
      apartment: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
    });
    this._checkEditMode();
    this._getCountries();
  }

  private _checkEditMode() {
    this.router.params.subscribe(params => {
      if (params['id']) {
        this.edditMode = true;
        this.currentId = params['id'];
        this.userService.getSingleUser(params['id']).subscribe(res => {
          this.userForm['name'].setValue(res.name);
          this.userForm['email'].setValue(res.email);
          this.userForm['phone'].setValue(res.phone);
          this.userForm['isAdmin'].setValue(res.isAdmin);
          this.userForm['street'].setValue(res.street);
          this.userForm['apartment'].setValue(res.apartment);
          this.userForm['zip'].setValue(res.zip);
          this.userForm['country'].setValue(res.country);
        })
      };
    })
  }
  private _getCountries() {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesLib.getNames('en', { select: 'official' })).map(entry => {
      return { id: entry[0], name: entry[1] }
    })
  }
  get userForm() {
    return this.form.controls;
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) return;
    const user: User = {
      id: this.currentId,
      name: this.userForm['name'].value,
      email: this.userForm['email'].value,
      // password: this.userForm['password'].value,
      phone: this.userForm['phone'].value,
      isAdmin: this.userForm['isAdmin'].value,
      street: this.userForm['street'].value,
      apartment: this.userForm['apartment'].value,
      zip: this.userForm['zip'].value,
      country: this.userForm['country'].value,

    }
    if (this.edditMode) return this.userService.updateUser(user, this.currentId).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Updated' });
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User not updated' });
      this.isSubmited = false;
    });
    return this.userService.createUser(user).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created' });
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User not created' });
      this.isSubmited = false;
    });
  }
  enableButton() {
    this.isSubmited = false;
  }
}
