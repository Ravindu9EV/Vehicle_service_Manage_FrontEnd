import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Vehicle } from '../../../model/Vehicle';

@Component({
  selector: 'app-update-details',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './update-details.component.html',
  styleUrl: './update-details.component.css',
})
export class UpdateDetailsComponent {
  constructor(private http: HttpClient) {}

  clearTextFields() {}

  public inputedVId: any;
  public newUser: any = {};
  public newVehicle: any = {};
  getAllUsers() {}
  updateUser() {}

  clearTxt() {}
  searchVehicle() {}
}
