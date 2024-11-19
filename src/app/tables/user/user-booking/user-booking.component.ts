import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Booking } from '../../../model/Booking';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-booking',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-booking.component.html',
  styleUrl: './user-booking.component.css',
})
export class UserBookingComponent {
  constructor(private http: HttpClient) {
    this.getBookings();
  }
  public bookings: Booking[] = [];
  getBookings() {
    this.http
      .get<Booking[]>('http://localhost:8080/booking/get-all')
      .subscribe((data) => {
        console.log(data);

        this.bookings = data;
      });
  }

  
}
