import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private http: HttpClient) {
    this.getRegisterdCustomers();
    this.getBookings();
  }
  public registeredCustomers: number = 0;
  public bookingCount: number = 0;

  getRegisterdCustomers() {
    this.http
      .get<[]>('http://localhost:8080/user/get-all')
      .subscribe((data) => {
        if (data != null) {
          this.registeredCustomers = data.length;
        }
      });
  }
  getBookings() {
    this.http
      .get<[]>('http://localhost:8080/booking/get-all')
      .subscribe((data) => {
        if (data.length > 0) {
          this.bookingCount = data.length;
        }
      });
  }
}
