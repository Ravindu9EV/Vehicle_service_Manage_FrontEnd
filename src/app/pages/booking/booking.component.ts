import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [NgFor,RouterLink],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent  {
    date=new Date()
    dates=[];
    
    public today:string=this.date.getFullYear().toString()+"/"+this.date.getMonth().toString()+"/"+this.date.getDate().toString();
    
   setTxtDate(){
    var choosed:any=document.getElementById("selectedDate");
    choosed?.addEventListener("click",(e:Event)=>{
      const selVal=e.target as HTMLInputElement;
      console.log(selVal.value);
      
      this.today=selVal.value;
      //checkDate:string=selVal.value.c+selVal.value.charAt(9);
      console.log(selVal.value.substring(5,7));
      let choosedYear:Number=Number.parseInt(selVal.value.substring(0,4))
      let choosedMonth:Number=Number.parseInt(selVal.value.substring(5,7))
      let choosedDate:Number=Number.parseInt(selVal.value.substring(8,));
      console.log(choosedYear);
      console.log(choosedMonth);
      console.log(choosedDate);
      if(choosedYear > new Number(Number.parseInt(new Date().getFullYear().toString()))){
          window.alert("Invalid Year!");
          window
      }
    });

    
   }

   // ---------set the service type-----------
   public dropDownDisplay:string='Choose Type'
   public availableServices:string[]=["Routine Maintenance","Engine","Transmission","Breake","Electrical System","Susspension and Steering ","Heating And Air Conditioning","Exhaust and Emission Control","Other"];

   
   setSelectedType(serviceType:string){
      this.dropDownDisplay=serviceType;
   }
    
  
      
    
  }
  
    
