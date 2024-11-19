import { Component } from '@angular/core';
import { AdminNavComponent } from '../../../pages/common/admin-nav/admin-nav.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../../model/Vehicle';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-vehicle',
  standalone: true,
  imports: [AdminNavComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './manage-vehicle.component.html',
  styleUrl: './manage-vehicle.component.css',
})
export class ManageVehicleComponent {
  constructor(private http: HttpClient) {
    this.loadVehicles();
  }
  public vehicleList: Vehicle[] = [];

  loadVehicles() {
    this.http
      .get<Vehicle[]>('http://localhost:8080/vehicle/get-all')
      .subscribe((data) => {
        console.log('hi');
        this.vehicleList = data;
        console.log(this.vehicleList);
      });
  }

  deleteVehicle(id: any) {
    console.log(id);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(
            `http://localhost:8080/vehicle/delete-by-id/filter?id=${Number.parseInt(
              id.toString()
            )}`
          )
          .subscribe((data) => {
            if (data) {
              console.log(data);
              this.loadVehicles();
            } else {
              Swal.fire({
                title: 'Not Deleted!',
                text: 'Something wrong!.',
                icon: 'success',
              });
            }
          });
      }
    });
  }
}
