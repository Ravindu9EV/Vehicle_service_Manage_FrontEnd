import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserAccountComponent } from '../../user/user-account/user-account.component';
import { AdminDashboardComponent } from '../../dashboard/admin-dashboard/admin-dashboard.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { ForgotPasswordComponent } from '../../../common/forgot-password/forgot-password.component';

@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ForgotPasswordComponent, RouterLink],
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.css',
})
export class UserLoginFormComponent {
  constructor(private http: HttpClient, private router: Router) {
    this.isLogged = false;
  }
  public login: any = {};

  public isLogged: boolean = false;
  public updateVehicle: any = {
    userId: '',
    model: '',
    licensePlate: '',
    madeYear: '',
  };
  public currentUser: any = {
    userId: '',
    name: '',
    contact: '',
    email: '',
    password: '',
    vehicleEntities: [this.updateVehicle],
  };

  userEmail: any = document
    .getElementById('userEmail')
    ?.textContent?.toString();
  userPassword: any = document
    .getElementById('userPassword')
    ?.textContent?.toString();

  checkLogin() {
    console.log(this.login);
    this.http
      .get(
        `http://localhost:8080/user/search-by-email-and-password/?email=${this.login.email}&password=${this.login.password}`
      )
      .subscribe((data) => {
        console.log(data);

        if (data) {
          this.isLogged = true;
          console.log(data);
          this.currentUser.email = this.login.email;
          this.currentUser.password = this.login.password;

          // document
          //   .getElementById('loginForm')
          //   ?.classList.remove('userLoginForm');
          // document.getElementById('loginForm')?.classList.add('hideForm');
          document.getElementById('exampleModal')?.classList.add('modal');
          document.getElementById('exampleModal')?.classList.add('fade');

          //this.searchUser();
          this.currentUser = data;
          //this.router.navigate(['/user-account']);
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

  //-------------------Verify User------------------------
  searchUser() {
    this.http
      .get(
        `http://localhost:8080/user/search-by-email-and-password/?email=${this.currentUser.email}&password=${this.currentUser.password}`,
        this.currentUser
      )
      .subscribe((data) => {
        if (data) {
          console.log(data);
          this.currentUser = data;
        } else {
          console.log(data);
        }
      });
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  public selectedUser: any = {
    userId: '',
    name: '',
    contact: '',
    email: '',
    password: '',
    vehicleEntities: [this.updateVehicle],
  };

  //-----------assign update User----------------
  updateUserSelection(user: any) {
    this.selectedUser = user;
  }

  //---------------Confirm and Update User-------------
  updateUser() {
    this.http
      .put('http://localhost:8080/user/update', this.selectedUser)
      .subscribe((data) => {
        if (data) {
          console.log(data);

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Every Filed must bu filled!',
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      });
  }

  // -------Clear Text Fields--------------
  clearTextFields() {
    this.currentUser = {};
    this.selectedUser = {};
    this.userEmail = '';
    this.currentUser.vehicleEntities = [];
  }

  // -------Log Out--------------------

  logOut() {
    this.isLogged = false;
    this.login.email = '';
    this.login.password = '';
    this.clearTextFields();
  }
}
