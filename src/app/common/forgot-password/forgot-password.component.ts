import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  constructor(private http: HttpClient, private router: Router) {
    //this.comparePasswords();
  }

  public userEmail: any;

  public code1: any;
  public code2: any;
  public code3: any;
  public code4: any;
  public code5: any;
  public code6: any;

  private otpCode: number = 0;
  sendOTP() {
    this.http
      .get<number>(
        `http://localhost:8080/user/reset-password/?email=${this.userEmail}`
      )
      .subscribe((data) => {
        if (data > 0) {
          this.otpCode = data;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Make Sure to Input Your registerd Email!',
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      });
    //this.router.navigate(['/forgot-password']);
  }

  //-----dearch user------
  private user: any = {
    name: '',
    email: '',
    contact: '',
    password: '',
    vehicleEntities: [],
  };
  checkOTP() {
    let formatedOtp: string =
      this.code1 +
      this.code2 +
      this.code3 +
      this.code4 +
      this.code5 +
      this.code6;
    console.log(typeof formatedOtp);
    if (this.otpCode.toString() === formatedOtp) {
      this.router.navigate(['new-password']);
    }
  }

  public password1: any;
  public password2: any;

  searchUser() {
    this.http
      .get(
        `http://localhost:8080/user/search-by-email/filter?email=${this.userEmail}`
      )
      .subscribe((data) => {
        if (data != null) {
          console.log(data);

          this.user = data;
        }
      });
  }
  comparePasswords() {
    //document.getElementById('password_2')?.addEventListener('keypress', (e) => {
    if (this.password1 === this.password2) {
      document.getElementById('password_2')?.classList.remove('is-invalid');
      document.getElementById('password_2')?.classList.add('is-valid');
    } else {
      document.getElementById('password_2')?.classList.remove('is-valid');
      document.getElementById('password_2')?.classList.add('is-invalid');
    }
    //});
  }
  confirmPassword() {
    // this.comparePasswords();
    if (this.password1 === this.password2) {
      this.user.password = this.password1;
      this.searchUser();
      this.updateUserPassword(this.user);
      console.log(this.user.password);
    }
  }
  updateUserPassword(userUp: any) {
    console.log(userUp);

    this.http
      .put('http://localhost:8080/user/update', this.user)
      .subscribe((data) => {
        if (data) {
          console.log(userUp + '   opppp');

          Swal.fire({
            title: 'Successfully Updated!',
            text: 'You clicked the button!',
            icon: 'success',
          });
          this.router.navigate(['/user-login']);
        }
      });
  }
}
