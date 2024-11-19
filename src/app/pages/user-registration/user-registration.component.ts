import { D, E } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { idText } from 'typescript';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css',
})
export class UserRegistrationComponent {
  constructor(private http: HttpClient) {
    this.getAllUsers();
  }
  // registerDetails() {
  //   //  if (
  //   //   this.newUser.email.toString().equals('') |
  //   //    this.newUser.password.equals('') |
  //   //    this.newUser.name.equals('')
  //   // ) {
  //   //   alert('You Missed to Fill All the Filds');
  //   // } else {

  //   console.log(this.newUser);
  //   console.log(this.newVehicle);
  //   this.newVehicle.userId = this.newUser.userId;
  //   this.newUser.vehicleEntities.push(this.newVehicle);

  //   // let isVehicleSaved: Boolean = ;
  //   // let isUserSaved: boolean = ;

  //   if (this.saveCustomer()) {
  //     console.log('saved');
  //     Swal.fire({
  //       position: 'top-end',
  //       icon: 'success',
  //       title: 'Your work has been saved',
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'Something went wrong!',
  //       footer: '<a href="#">Why do I have this issue?</a>',
  //     });
  //   }
  //   // }
  // }

  public newVehicle: any = {
    userId: '', //need to implement id generator
    model: '',
    licensePlate: '',
    madeYear: '',
  };
  public newUser: any = {
    name: '',
    email: '',
    contact: '',
    password: '',
    vehicleEntities: [
      this.newVehicle,
      // {
      //   userId: '',
      //   model: '',
      //   locensePlate: '',
      //   madeYear: '',
      // },
    ],
  };

  //-------------Save User-------------------
  private iud: string = '';

  saveCustomer(): boolean {
    this.newVehicle.userId = this.newUser.id;

    console.log(this.newUser);
    let timerInterval2: any;
    Swal.fire({
      title: 'Data is Being Saved!',
      html: 'Alert will close in <b></b> milliseconds.',
      timer: 8000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const popup = Swal.getPopup();
        if (popup) {
          const timer1 = popup.querySelector('b');
          if (timer1) {
            timerInterval2 = setInterval(() => {
              timer1.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          }
        }
      },
      willClose: () => {
        clearInterval(timerInterval2);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });
    this.http
      .post<boolean>('http://localhost:8080/user/add-user', this.newUser)
      .subscribe((data) => {
        if (data) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500,
          });
          this.clearTeaxtFields();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!,Please make sure to fill every field of User details & Vehicle details!',
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
        console.log(data + 'Us Saved');

        return data;
      });
    return false;
  }

  //--------------Get User details------------------
  getAllUsers() {
    this.http.get('http://localhost:8080/user/get-all').subscribe((data) => {
      console.log(data);
    });
  }

  //------------------Clear Text Fields--------------------
  clearTeaxtFields() {
    this.newUser.name = '';
    this.newUser.email = '';
    this.newUser.contact = '';
    this.newUser.password = '';
    this.newVehicle.model = '';
    this.newVehicle.licensePlate = '';
    this.newVehicle.madeYear = '';
  }
}
