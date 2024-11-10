import { Component } from '@angular/core';
import { AdminNavComponent } from '../../../pages/common/admin-nav/admin-nav.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking-manage',
  standalone: true,
  imports: [AdminNavComponent,FormsModule,CommonModule],
  templateUrl: './booking-manage.component.html',
  styleUrl: './booking-manage.component.css'
})
export class BookingManageComponent {

constructor(private http:HttpClient){
  
}

}
