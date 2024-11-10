import { Component } from '@angular/core';
import { AdminNavComponent } from '../../../pages/common/admin-nav/admin-nav.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-vehicle',
  standalone: true,
  imports: [AdminNavComponent,FormsModule,CommonModule,HttpClientModule],
  templateUrl: './manage-vehicle.component.html',
  styleUrl: './manage-vehicle.component.css'
})
export class ManageVehicleComponent {
constructor(private http:HttpClient){

}

loadVehicles(){
  this.http.get("http://localhost:8080/vehicle/get-all").subscribe((data)=>{
    console.log("hi");
    
 })
}
}
