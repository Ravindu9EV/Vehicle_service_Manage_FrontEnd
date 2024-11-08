import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {

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
    this.http.post("http://localhost:8080/vehicle/save",this.vehicle).subscribe((data)=>{
      alert("Vehicle Added!")
    })
  }
}
