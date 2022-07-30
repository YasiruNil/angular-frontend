import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@frontend/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';
declare const require: (arg0: string) => countriesLib.LocaleData;
@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html',
})

export class UserListComponent implements OnInit {
  users: User[] = [];
  countries: { id: string, name: string }[] | [] = [];
  constructor(
    private userService: UsersService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this._getUsers();
    this._getCountries();
  }
  private _getUsers() {
    this.userService.getUserss().subscribe(response => {
      this.users = response;
    })

  }
  private _getCountries() {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesLib.getNames('en', { select: 'official' })).map(entry => {
      return { id: entry[0], name: entry[1] }
    })
  }
  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`);
  }
  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the category?',
      icon: 'pi pi-exclamation-triangle',
      header: 'Delete Category',
      accept: () => {
        this.userService.deleteUser(userId).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product got deleted' });
          this._getUsers();
        }, () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product not got deleted' });
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'Warn', summary: 'Warn', detail: 'Cancel category deletion' });
      }
    });


  }
  getCountryName(countryKey: string) {
    if (countryKey) return this.userService.getCountry(countryKey);
    return null;
  }
}
