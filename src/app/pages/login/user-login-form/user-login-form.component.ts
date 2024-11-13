import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserAccountComponent } from '../../user/user-account/user-account.component';
import { AdminDashboardComponent } from '../../dashboard/admin-dashboard/admin-dashboard.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
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
    console.log(this.login);
    this.http
      .post('http://localhost:8080/login/user-login', this.login)
      .subscribe((data) => {
        if (data) {
          console.log(data);
          this.router.navigate(['/user-account']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!,May be Email or Vehicle with the same License Plate already Registerd!',
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      });
  }
}
