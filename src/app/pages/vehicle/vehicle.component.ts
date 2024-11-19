import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css',
})
export class VehicleComponent {
  constructor(private http: HttpClient) {}
  public vehicle: any = {
    userId: '',
    model: '',
    licensePlate: '',
    madeYear: '',
  };

  searchVehicle(id: string) {
    this.http
      .get(`http://localhost:8080/vehicle/search-by-id/${id}`)
      .subscribe((data) => {
        this.vehicle = data;
        console.log(data);
      });
  }

  addVehicle() {
    this.http.get;
    this.http
      .post('http://localhost:8080/vehicle/save', this.vehicle)
      .subscribe((data) => {
        if (data) {
          Swal.fire({
            title: 'Successfuly Added!',
            text: 'You clicked the button!',
            icon: 'success',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went Wrong...Check Your Details!',
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      });
  }
}
