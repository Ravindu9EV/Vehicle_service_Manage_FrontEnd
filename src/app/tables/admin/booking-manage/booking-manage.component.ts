import { Component } from '@angular/core';
import { AdminNavComponent } from '../../../pages/common/admin-nav/admin-nav.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../../../model/Booking';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { RouterLink } from '@angular/router';
import { Repair } from '../../../model/Repair';
import { D } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-booking-manage',
  standalone: true,
  imports: [RouterLink, AdminNavComponent, FormsModule, CommonModule],
  templateUrl: './booking-manage.component.html',
  styleUrl: './booking-manage.component.css',
})
export class BookingManageComponent {
  constructor(private http: HttpClient) {
    this.getBookings();
    this.getRepairs();
  }

  public availableRepairs: Repair[] = [];
  public bookings: Booking[] = [];

  public dropDownDisplay: string = 'Choose Type';

  //-----------------load bookings---------------------------------
  getBookings() {
    this.http
      .get<Booking[]>('http://localhost:8080/booking/get-all')
      .subscribe((data) => {
        console.log(data);

        this.bookings = data;
      });
  }

  //-------------------delete booking------------------
  deleteBooking(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.http
            .delete(
              `http://localhost:8080/booking/delete/filter?id=${Number.parseInt(
                id.toString()
              )}`
            )
            .subscribe((data) => {
              if (data) {
                this.getBookings();
                swalWithBootstrapButtons.fire({
                  title: 'Deleted!',
                  text: 'Your file has been deleted.',
                  icon: 'success',
                });
              }
            });
        } else if (
          /* Read more about handling dismissals below */

          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'Your imaginary file is safe :)',
            icon: 'error',
          });
        }
      });
  }
  //---------update booking--------------------------

  selectedBooking: Booking = new Booking(0, 0, '', '', 0, '');
  public selectTime = 'Choose Time';
  updateBooking(booking: Booking) {
    this.selectedBooking = booking;

    this.selectTime = booking.bookedTime;
    this.setTypeWhenLoading();
  }

  public availableRepairTypes: string[] = [];
  //-------------get Repairs-----------
  getRepairs() {
    this.http
      .get<Repair[]>('http://localhost:8080/repair/get-all')
      .subscribe((data) => {
        this.availableRepairs = data;
        this.setRepairTypes(data);
      });
  }

  setRepairTypes(data: any[]) {
    data.forEach((repair) => {
      console.log(repair.type + 'hiiiiii');

      this.availableRepairTypes.push(repair.type);
    });
  }
  setSelectedType(type: any) {
    this.dropDownDisplay = type;
    this.getRepairByType(type);
  }

  //-----------------Set Date-----------------
  public crntDate: Date = new Date();
  crntYear: number = this.crntDate.getUTCFullYear();
  crntMonth: number = this.crntDate.getUTCMonth() + 1;
  crntDay: number = this.crntDate.getDay();
  public minDate: string =
    this.crntYear + '-' + this.crntMonth + '-' + (this.crntDay + 10); //"2024-11-10";
  crntDayM: number = this.crntDay;
  public maxDate: string = this.crntYear + '-12-30';

  public availableTimeSlots: string[] = [
    '08:00am-09:00am',
    '09:00am-10:00am',
    '10:15am-11:15am',
    '11:15am-12:15am',
    '13:00am-14:00pm',
    '14:00am-15:00pm',
    '15:20am-16:20pm',
    '16:20am-17:20pm',
  ];

  //----------------Update Booking Typpe----------------------------------
  setSelectedTime(time: any) {
    //-------------------check available booking----------------------
    this.http
      .get<Booking>(
        `http://localhost:8080/booking/get-available-booking/filter?bookedDate=${this.selectedBooking.bookedDate}&bookedTime=${time}`
      )
      .subscribe((data) => {
        if (data == null) {
          
          this.selectTime = time;
          this.selectedBooking.bookedTime = this.selectTime;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Date and Time already reserved... Please select different Date/Time!',
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      });
  }

  //-------------------------update Date----------------------------------
  updateDate() {
    console.log(this.selectedBooking.bookedDate);
  }

  // ----------------------------get repair by type and update booking repair ID-------------------------
  getRepairByType(type: string) {
    this.http
      .get<Repair>(
        `http://localhost:8080/repair/search-by-type/filter?type=${type}`
      )
      .subscribe((data) => {
        if (data != null) {
          console.log(data.id);

          this.selectedBooking.repairId = data.id;
          console.log(this.selectedBooking.repairId);
        }
      });
  }

  //-----------------Set RepairType when loading-----------------

  setTypeWhenLoading() {
    this.http
      .get<Repair>(
        `http://localhost:8080/repair/search-by-id/${this.selectedBooking.repairId}`
      )
      .subscribe((data) => {
        if (data != null) {
          this.dropDownDisplay = data.type;
          console.log(this.dropDownDisplay);
        }
      });
  }

  

  //------------------------confirm update-----------------------------
  update() {
    console.log(this.selectedBooking);
    console.log(this.selectedBooking.description);

    this.http
      .put('http://localhost:8080/booking/update', this.selectedBooking)
      .subscribe((data) => {
        console.log(data);
        if (data) {
          this.getBookings();
          Swal.fire({
            title: 'Successfully Updated!',
            text: 'You clicked the button!',
            icon: 'success',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      });
  }

  // setBookingTime(time: any) {
  //   this.selectTime = time;
  // }
}
