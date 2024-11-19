import { Component } from '@angular/core';
import { AdminNavComponent } from '../../../pages/common/admin-nav/admin-nav.component';
import {
  FetchBackend,
  HttpBackend,
  HttpClient,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../../../model/Vehicle';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-manage',
  standalone: true,
  imports: [AdminNavComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './user-manage.component.html',
  styleUrl: './user-manage.component.css',
})
export class UserManageComponent {
  constructor(private http: HttpClient) {
    this.getAllUsers();
  }

  public users: any[] = [];

  //------get all users---------------------------
  getAllUsers() {
    this.http
      .get<any[]>('http://localhost:8080/user/get-all')
      .subscribe((data) => {
        console.log(data);

        this.users = data;
        console.log(this.users);
        data.forEach((d) => {
          console.log(d.vehicleEntities.length);
        });
      });
  }
}
