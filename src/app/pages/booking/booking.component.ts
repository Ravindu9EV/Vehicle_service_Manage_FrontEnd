import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
   public choosedDate(){
    const time=document.getElementById("datePicker")
      if(time){
        time.textContent =new Date().getDate().toString();
      
      }
   
   }
    
  
      
    
  }

