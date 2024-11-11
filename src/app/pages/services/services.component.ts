import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  constructor(private http:HttpClient){
    this.loadRepairDetails()
  }


    //----------------------Load repair Details-------------------
  
    public repairs:any=[]

    loadRepairDetails(){
     this.http.get("http://localhost:8080/repair/get-all").subscribe(data=>{
       this.repairs=data
     
   });
  }


}
