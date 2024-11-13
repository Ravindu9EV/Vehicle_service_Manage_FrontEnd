import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserBookingComponent } from '../../../tables/user/user-booking/user-booking.component';
import { UserRepairsComponent } from '../../../tables/user/user-repairs/user-repairs.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../../../model/Vehicle';
import { UpdateDetailsComponent } from '../update-details/update-details.component';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormsModule, CommonModule],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css',
})
export class UserAccountComponent {
  constructor(private http: HttpClient) {}

  clearTextFields() {}

  public updateVehicle: any = {
    userId: '',
    model: '',
    licensePlate: '',
    madeYear: '',
  };

  public updateUser: any = {
    userId: '',
    email: '',
    contact: '',
    password: '',
    vehicleEntities: [this.updateVehicle],
  };

  updateCustomer() {
    this.http
      .put('http://localhost:8080/user/update', this.updateUser)
      .subscribe((data) => {
        if (data) {
          console.log(data);
        } else {
          console.log(data);
        }
      });
  }
}
