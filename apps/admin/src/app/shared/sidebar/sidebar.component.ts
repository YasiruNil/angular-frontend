import { Component } from '@angular/core';
import { AuthService } from '@frontend/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent{
  constructor(private authService: AuthService) { }
  logout() {
    this.authService.logout();
  }
}
