import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vehicle-registration',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './vehicle-registration.component.html',
  styleUrl: './vehicle-registration.component.css',
})
export class VehicleRegistrationComponent {
  constructor(private http: HttpClient) {}
  public vehicle: any = {
    userId: '',
    model: '',
    licensePlate: '',
    madeYear: '',
  };

  public searchUserId: any = '';

  searchUser() {
    this.http
      .get(
        `http://localhost:8080/user/search-by-id/filter?id=${this.searchUserId}`
      )
      .subscribe((data) => {
        if (data != null) {
          this.vehicle.userId = this.searchUserId;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong Id...User not found!',
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      });
  }

  addVehicle() {
    console.log(this.vehicle);
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.http
          .post('http://localhost:8080/vehicle/save', this.vehicle)
          .subscribe((data) => {
            if (data) {
              Swal.fire('Saved!', '', 'success');
              this.clearTxt();
              this.searchUserId = '';
            }
          });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  clearTxt() {
    this.vehicle.userId = '';
    this.vehicle.model = '';
    this.vehicle.licensePlate = '';
    this.vehicle.madeYear = '';
  }
}
