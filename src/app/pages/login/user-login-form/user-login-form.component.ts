import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserAccountComponent } from '../../user/user-account/user-account.component';
import { AdminDashboardComponent } from '../../dashboard/admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    UserAccountComponent,
    AdminDashboardComponent,
  ],
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.css',
})
export class UserLoginFormComponent {
  constructor(private http: HttpClient, private router: Router) {}
  public login: any = {};

  userEmail: any = document
    .getElementById('userEmail')
    ?.textContent?.toString();
  userPassword: any = document
    .getElementById('userPassword')
    ?.textContent?.toString();
  checkLogin() {
    alert('ho');
    console.log(this.login);
    this.http
      .get('http://localhost:8080/login/user-login', this.login)
      .subscribe((data) => {
        console.log(data);
        if (data) {
          this.router.navigate(['/admin-dashboard']);
        } else {
          alert('Oops');
        }
      });
  }
}
