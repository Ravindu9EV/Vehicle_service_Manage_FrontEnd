import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-registration',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './vehicle-registration.component.html',
  styleUrl: './vehicle-registration.component.css'
})
export class VehicleRegistrationComponent {
  constructor(private http:HttpClient){}
  public vehicle:any={
    userId:"",
    model:"",
    licensePlate:"",
    madeYear:""
  }

 searchVehicle(id:string){
    this.http.get(`http://localhost:8080/vehicle/search-by-id/${id}`).subscribe((data)=>{
      this.vehicle=data;
      console.log(data);
      
    })
  }

  addVehicle(){
    console.log(this.vehicle);
    
    this.http.post("http://localhost:8080/vehicle/save",this.vehicle).subscribe((data)=>{
      alert("Vehicle Added!")
    })
  }
}
