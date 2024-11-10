import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminNavComponent } from '../../../pages/common/admin-nav/admin-nav.component';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-repair-manage',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule,AdminNavComponent],
  templateUrl: './repair-manage.component.html',
  styleUrl: './repair-manage.component.css'
})
export class RepairManageComponent  {
  constructor(private http:HttpClient){
   this.loadRepairTable()
  }


  //----------------------Load repair Table--------------------
  
  public repairs:any=[]

   loadRepairTable(){
    this.http.get("http://localhost:8080/repair/get-all").subscribe(data=>{
      this.repairs=data
    
  });
    
  }


  //-----------Add New Repair---------------
  public newRepair:any={
    id:null,
  }
  addNewRepair(){
    console.log(this.newRepair);
    
    // if(this.newRepair.type.equals("")| this.newRepair.cost.equals("") | this.newRepair.duration.equals("")|this.newRepair.description.equals("")){
    //   alert("You Have Missed Some Fileds!")
    // }else if(this.newRepair===null){
    //   alert("All Fields Should be filled!")
    // }else{
      this.http.post("http://localhost:8080/repair/add-repair",this.newRepair).subscribe(data=>{
      
      
        
        if(data){
          console.log(data);
          
         alert("Successfully Added!")
         this.loadRepairTable();
       
       }else{
         alert("Invalid Details!!!")
         
       }
     })
    
    
  }
  //----------------Delete a Repair---------------

  deleteRepair(id:any){
    this.http.delete(`http://localhost:8080/repair/delete-by-id/${id}`).subscribe(data=>{
      if(data){
        console.log(data);
        
        alert("Successfully Deleted!")
        this.loadRepairTable()
        
      }else{
        alert("Invalid Id")
      }
      
    })
  }
  //-------------update repair-------------------------------
  public updateRepairDetails:any={
    id:null,
    type:"",
    cost:"",
    duration:"",
    description:""

  }
  updateRepair(repair:any){
    this.updateRepairDetails=repair
    console.log(this.updateRepairDetails);
    
    
  }

  updateR(){
    this.http.put("http://localhost:8080/repair/update",this.updateRepairDetails).subscribe(data=>{
      if(this.updateRepairDetails.type.equals("")| this.updateRepairDetails.cost.equals("") | this.updateRepairDetails.duration.equals("")|this.updateRepairDetails.description.equals("")){
        alert("All Fields Should be filled!")
        
      }else if(data){
        alert("Successfully Added!")
        this.loadRepairTable();
        this.clearTxt()
      }else{
        alert("Invalid Details!!!")
        this.clearTxt()
      }
    })
  }

  //------------------clear Txt-----------
  clearTxt(){
    this.newRepair={}
    
  }
  
}
