import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  viewChild,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Repair } from '../../model/Repair';
import { Booking } from '../../model/Booking';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent {
  constructor(private http: HttpClient) {
    this.setButtonColor();
    this.getRepairs();
    this.loadCrntDate();
    //this.getAvailableBooking()
    // this.setBtnTimeSlots()
  }

  //------------Clear search Input filed----------------------
  clearTxt() {
    // const ser = document.getElementById('searchVId');
    // if (ser) {
    //   ser.textContent = '';
    // }
    this.booking.vehicleId = '';
  }
  //-----------------Set Date-----------------
  public crntDate: Date = new Date();
  crntYear: number = this.crntDate.getUTCFullYear();
  crntMonth: number = this.crntDate.getUTCMonth() + 1;
  crntDay: number = this.crntDate.getDay();
  public minDate: string =
    this.crntYear + '-' + this.crntMonth + '-' + (this.crntDay + 17); //"2024-11-10";
  crntDayM: number = this.crntDay;
  public maxDate: string = this.crntYear + '-12-30';

  async sd() {
    console.log(this.crntDay + '- d', this.crntMonth + '- M', this.crntYear);
  }

  dpDate: any = document.getElementById('selectedDate')?.textContent;
  public chck: String = '';
  loadCrntDate() {
    const dt: Date = new Date();
    this.booking.bookedDate = this.setDateFormat(
      dt.getUTCMonth() + 1,
      dt.getUTCDate(),
      dt.getUTCFullYear()
    );
    this.booking.bookedDate = this.chck;
    //this.dpDate=this.booking.bookedDate;
    this.setBtnTimeSlots();
    return this.dpDate;
  }

  clearD() {
    this.crntDay = 0;
    this.crntDay = 0;
    this.crntYear = 0;
  }

  date = new Date();
  dates = [];
  public timeSlots = [
    '08:00am-09:00am',
    '09:00am-10:00am',
    '10:15am-11:15am',
    '11:15am-12:15pm',
    '13:00pm-14:00pm',
    '14:00pm-15:00pm',
    '15:20pm-16:20pm',
    '16:20pm-17:20pm',
  ];
  public today: string =
    this.date.getFullYear().toString() +
    '/' +
    this.date.getMonth().toString() +
    '/' +
    this.date.getDate().toString();

  ///------------------------Get Available Booking-----------
  getAvailableBooking() {
    this.http
      .get(
        `http://localhost:8080/booking/get-available-booking/filter?bookedDate=${this.booking.bookedDate}&bookedTime=${this.booking.bookedTime}`
      )
      .subscribe((data) => {
        if (data != null) {
          console.log(data);

          // this.timeSlots.forEach(d=>{
          //   if(d===data.bookedTime){
          //     console.log();

          //   }
          // })
        }
      });
  }

  ///------------------------Get All Bookings-----------
  getAllBookings(seletedD: Date) {
    let checkDate: string =
      seletedD.getUTCFullYear().toString() +
      '-' +
      (seletedD.getUTCMonth() + 1).toString() +
      '-' +
      seletedD.getUTCDate().toString();
    console.log(checkDate);
    this.http
      .get<Booking[]>('http://localhost:8080/booking/get-all')
      .subscribe((data) => {
        console.log(data);
        for (let book of data) {
          if (checkDate === book.bookedDate) {
            console.log(checkDate + 'Hi');
            console.log();
          } else {
            console.log('noooo');
          }
        }
      });
  }

  //---------------------design time slots acording to availble time-----------

  setBtnTimeSlots() {
    console.log(this.getCurrentDateFormat());

    this.http
      .get(
        `http://localhost:8080/booking/search-booking-by-date/filter?bookedDate=${this.getCurrentDateFormat()}`
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  getCurrentDateFormat() {
    const d: Date = new Date();
    return d.getFullYear() + '-' + d.getUTCMonth() + '-' + d.getUTCDate();
  }

  // ---------set the service type-----------
  public dropDownDisplay: string = 'Choose Type';
  //["Routine Maintenance","Engine","Transmission","Breake","Electrical System","Susspension and Steering ","Heating And Air Conditioning","Exhaust and Emission Control","Other"];
  public buttonColor: string[] = [];
  repairList: Repair[] = [];
  public availableServices: string[] = [];

  getRepairs() {
    this.http
      .get<Repair[]>('http://localhost:8080/repair/get-all')
      .subscribe((data) => {
        data.forEach((rep) => {
          this.repairList.push(rep);
        });
        console.log(data);
        console.log(this.repairList);
        this.setAvailableServices();
      });
  }

  setAvailableServices() {
    this.repairList.forEach((d) => {
      console.log(d.type);
      this.availableServices.push(d.type);
    });

    console.log(this.availableServices);
  }

  public booking: any = {
    vehicleId: null,
    bookedDate: '',
    bookedTime: '',
    repairId: null,
    description: '',
  };

  //---------------set Service Type--------------------
  setSelectedType(serviceType: string) {
    this.dropDownDisplay = serviceType;
    this.setRepairId(serviceType);
  }

  setRepairId(type: string) {
    this.repairList.forEach((d) => {
      if (d.type === type) {
        this.booking.repairId = d.id;
        console.log(this.booking.repairId);
      }
    });
  }

  //-----------set timeslot btns color----------
  private currentDate: Date = new Date();
  private formatDate: string = '';

  //----------format-date------------
  setDateFormat(month: any, day: any, year: any) {
    return (this.formatDate =
      month.toString() + '/' + day.toString() + '/' + year.toString());
  }
  fillBooking(time: any) {
    //alert(time+"\n"+(document.getElementById("selectedDate")?.innerText))
    this.booking.bookedTime = time;
  }

  public isAvailable: boolean = false;
  private choosedTime: string = '';
  setChoosedTime(choosedTime: any) {
    console.log(choosedTime.toString());

    this.choosedTime = choosedTime.toString();
  }

  params: HttpParams = new HttpParams();

  //  setTimeSlotsAvailabilityByDate(choosedDate:string){
  //   this.params=new HttpParams().set("bookedDate",choosedDate).set("bookedTime",this.choosedTime);
  //   this.http.get("http://localhost:8080/booking/get-available-booking",{ params:this.params }).subscribe((data)=>{
  //       console.log(data);
  //       if(data==null){
  //         console.log("hi");

  //       }

  //   })
  // }

  async setTimeSlotsAvailabilityByDateandTime(
    selectedDate: string,
    availableTime: string
  ) {
    this.buttonColor = [];
    // this.params = new HttpParams()
    //   .set('bookedDate', this.formatDate)
    //   .set('bookedTime', this.choosedTime);
    // this.http
    //   .get(`http://localhost:8080/booking/get-available-booking/filter?bookedDate=${this.formatDate}&bookedTime=${this.choosedTime}`, {
    //     params: this.params,
    //   })
    this.http
      .get(
        `http://localhost:8080/booking/get-available-booking/filter?bookedDate=${this.formatDate}&bookedTime=${this.choosedTime}`
      )
      .subscribe((data) => {
        console.log(data);
        if (data == null) {
          this.isAvailable = true;
          console.log('hi');
          this.buttonColor.push('green');
        } else {
          this.buttonColor.push('blue');
        }
      });
  }

  setButtonColor() {
    this.timeSlots.forEach((t) => {
      this.setTimeSlotsAvailabilityByDateandTime(
        this.setDateFormat(
          String(this.currentDate.getMonth()).padStart(2, '0'),
          String(this.currentDate.getDate()).padStart(2, '0'),
          String(this.currentDate.getFullYear())
        ),
        t
      );
      if (this.isAvailable) {
      }
    });
  }

  setTxtDate() {
    var choosed: any = document.getElementById('selectedDate');
    choosed?.addEventListener('click', (e: Event) => {
      const selVal = e.target as HTMLInputElement;
      console.log(selVal.value);

      this.today = selVal.value;
      //checkDate:string=selVal.value.c+selVal.value.charAt(9);
      console.log(selVal.value.substring(5, 7));
      let choosedYear: Number = Number.parseInt(selVal.value.substring(0, 4));
      let choosedMonth: Number = Number.parseInt(selVal.value.substring(5, 7));
      let choosedDate: Number = Number.parseInt(selVal.value.substring(8));
      console.log(choosedYear);
      console.log(choosedMonth);
      console.log(choosedDate);
      this.booking.bookedDate =
        choosedYear + '-' + choosedMonth + '-' + choosedDate;
      this.setDateFormat(
        selVal.value.substring(5, 7),
        selVal.value.substring(0, 4),
        selVal.value.substring(8).substring(0, 4)
      );

      if (
        choosedYear >
        new Number(Number.parseInt(new Date().getFullYear().toString()))
      ) {
        window.alert('Invalid Year!');
        window;
      }
    });
  }

  public inputedVId: any;
  searchVehicleId: number = 0;

  //----------SearchVehicle-----------------
  searchVehicle() {
    this.searchVehicleId = Number.parseInt(this.inputedVId.toString());

    if (this.searchVehicleId > 0) {
      this.http
        .get(
          `http://localhost:8080/vehicle/search-by-id/${this.searchVehicleId}`
        )
        .subscribe((data) => {
          if (data != null) {
            this.booking.vehicleId = this.searchVehicleId;
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Wrong VehicleId, Please Register Before reserving a Booking!',
              footer: '<a href="#">Why do I have this issue?</a>',
            });
          }
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Wrong Id!\n\nRegister Befor choose a Booking if haven't",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      this.booking.vehicleId = '';
      this.searchVehicleId;
    }
  }

  //-----------------Add Booking--------------------------

  addBooking() {
    let timerInterval: any;
    Swal.fire({
      title: 'Boking in Progress!',
      html: 'This Alert will close in <b></b> milliseconds.',
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const popup: any = Swal.getPopup();
        const timer = popup.querySelector('b');
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });

    this.http
      .post('http://localhost:8080/booking/add-booking', this.booking)
      .subscribe((data) => {
        if (data) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Reservation Successfull',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Slot Reserved!!!!',
            text: 'Selected Slot is unavailable.Please pick another slot!',
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      });
  }
}
