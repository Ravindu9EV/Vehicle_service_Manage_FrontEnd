import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,HttpClientModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  constructor(private http:HttpClient){
     
    this.setButtonColor();
    
  }
  ngOnInit(): void {
    this.sd()
  }

  //-----------------Set Date-----------------
  crntDate:Date=new Date();
  crntYear:number=this.crntDate.getUTCFullYear()
  crntMonth:number=this.crntDate.getUTCMonth()+1
  crntDay:number=this.crntDate.getDay()
  public minDate:string=this.crntYear+"-"+this.crntMonth+"-"+(this.crntDay+10) ;//"2024-11-10";
  crntDayM:number=this.crntDay-10
  public maxDate:string="2024-11-"+this.crntDayM;

  sd(){
    console.log(this.crntDay+"- d",this.crntMonth+"- M",this.crntYear);
    
  }
  
clearD(){
  this.crntDay=0;
    this.crntDay=0;
    this.crntYear=0
}





    date=new Date()
    dates=[];
    public timeSlots=["08:00am-09:00am","09:00am-10:00am","10:15am-11:15am","11:15am-12:15am","13:00am-14:00pm","14:00am-15:00pm","15:20am-16:20pm","16:20am-17:20pm"];
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

      this.setDateFormat(selVal.value.substring(5,7),selVal.value.substring(0,4),selVal.value.substring(8,).substring(0,4));

      if(choosedYear > new Number(Number.parseInt(new Date().getFullYear().toString()))){
          window.alert("Invalid Year!");
          window
      }
    });

    
   }

   // ---------set the service type-----------
   public dropDownDisplay:string='Choose Type'
   public availableServices:string[]=["Routine Maintenance","Engine","Transmission","Breake","Electrical System","Susspension and Steering ","Heating And Air Conditioning","Exhaust and Emission Control","Other"];
   public buttonColor:string[]=[]
   
   setSelectedType(serviceType:string){
      this.dropDownDisplay=serviceType;
   }
    public booking:any={}
   
  
      //-----------set timeslot btns color----------
    private currentDate:Date=new Date();
    private formatDate:string="";

        //----------format-date------------
    setDateFormat(month:any,day:any,year:any){
      return this.formatDate=month.toString()+"/"+day.toString()+"/"+year.toString();
    }
    fillBooking(time:any){
        alert(time+"\n"+(document.getElementById("selectedDate")?.innerText))
     }

    public isAvailable:boolean=false;
    private choosedTime:string="";
    setChoosedTime(choosedTime:any){
      console.log(choosedTime.toString());
      
        this.choosedTime=choosedTime.toString();
    }
    params:HttpParams=new HttpParams()
   
    async setTimeSlotsAvailabilityByDate(choosedDate:string){
      this.params=new HttpParams().set("bookedDate",choosedDate).set("bookedTime",this.choosedTime);
      this.http.get("http://localhost:8080/booking/get-available-booking",{ params:this.params }).subscribe((data)=>{
          console.log(data);
          if(data==null){
            console.log("hi");
            
          }
          
      })
    }

    async setTimeSlotsAvailabilityByDateandTime(selectedDate:string,availableTime:string){
      this.buttonColor=[]
      this.params=new HttpParams().set("bookedDate",this.formatDate).set("bookedTime",this.choosedTime);
      this.http.get("http://localhost:8080/booking/get-available-booking",{ params:this.params }).subscribe((data)=>{
          console.log(data);
          if(data==null){
            this.isAvailable=true;
            console.log("hi");
            this.buttonColor.push("green");
            
          }else{

            this.buttonColor.push("blue")
          }
          
      })
    }

    setButtonColor(){
      
      this.timeSlots.forEach(t=>{
        this.setTimeSlotsAvailabilityByDateandTime(this.setDateFormat((String(this.currentDate.getMonth()).padStart(2,'0')),(String(this.currentDate.getDate()).padStart(2,'0')),(String(this.currentDate.getFullYear()))),t);
        if(this.isAvailable){

        }
       })
    }
    
  }
  
    
