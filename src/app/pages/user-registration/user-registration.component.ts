import { E } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { idText } from 'typescript';
@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})


export class UserRegistrationComponent {

 
  constructor(private http:HttpClient){
    this.getAllUsers()
  }
  registerDetails(){
    if(this.newUser.email.equals("") | this.newUser.password.equals("") | this.newUser.name.equals("")){
      alert("You Missed to Fill All the Filds")
    }else{
      console.log("saved");
      console.log(this.newUser);
      console.log(this.newVehicle);
      this.newVehicle.userId=this.newUser.userId;
      this.newUser.vehicleEntities.push(this.newVehicle);
   
      this.saveCustomer();
      this.saveVehicle();
    }
    
   
  }
  public newUser:any={
    name:"",
    email:"",
    contact:"",
    password:"",
    vehicleEntities:[{
      userId:"",
      model:"",
      locensePlate:"",
      madeYear:""
    }]
  }
  
  //-------------Save User-------------------
  private iud:string="" ;
  saveCustomer(){
    this.newVehicle.userId=this.newUser.id;
    console.log((this.iud).toString());
    
    console.log(this.newUser);
     this.http.post("http://localhost:8080/user/add-user",this.newUser).subscribe((data)=>{
        if(data){
          alert("Details Added!")
          this.newUser={}
          this.newVehicle={}
          this.clearTeaxtFields()
        }else{
          alert("You Already Registerd with same email!")
          this.clearTeaxtFields()
        }
      
    
    })
  }

  
  //----------Save new Vehicle-----------------

  public newVehicle:any={
    userId: "",//need to implement id generator
    model:"",
    licensePlate:"",
    madeYear:""
  }
  
  saveVehicle(){
    if( this.newVehicle.model.equals("") || this.newVehicle.licensePlate.equals("")||this.newVehicle.madeYear.equals("")){
      alert("Oops!")
      
    }else{
       //this.newVehicle.userId=this.newUser.id;
       console.log(this.newVehicle.userId);
      
       console.log("inside vehicle");
       console.log((this.newUser.id).toString());
       
       this.http.post("http://localhost:8080/vehicle/save",this.newVehicle).subscribe((data)=>{
        if(data){
          alert("Vehicle saved!")
          console.log(this.newVehicle);
        }else{
          alert("Something missing!")
        }
         
       })
    }
     

    
  }

  //--------------Get User details------------------
  getAllUsers(){
    this.http.get("http://localhost:8080/user/get-all").subscribe(data=>{
      console.log(data);
      
    })
  }

   //------------------Clear Text Fields--------------------
   clearTeaxtFields(){
      this.newUser.name=""
      this.newUser.email=""
      this.newUser.contact=""
      this.newUser.password=""
      this.newVehicle.model=""
      this.newVehicle.licensePlate=""
      this.newVehicle.madeYear=""
    }
  
  }

   
  

