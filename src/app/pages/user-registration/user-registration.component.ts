import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { idText } from 'typescript';
@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [FormsModule,CommonModule, HttpClientModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {

  // class User{
  //   name:string;
  //   email:string;
  //   contact:string;
  //   password:string;

  //   constructor(name:string,email:string,contact:string,password:string){
  //       this.name=name;
  //       this.email=email;
  //       this.contact=contact;
  //       this.password=password;
  //   }
  // }
  //const user: User=new User("12","dd","3423434","fjf");

  //  name=document.getElementById("userName")?.textContent?.toString()
  //  email=document.getElementById("userEmail")?.textContent?.toString()
  // contact=document.getElementById("userContact")?.textContent?.toString()
  // password=document.getElementById("userPassword")?.textContent?.toString()
// interface User{
//   name:string;
// }

  // const f:User={
  //   name:document.getElementById("userName")?.textContent?.toString(),
  //   email:document.getElementById("userEmail")?.textContent?.toString(),
  //  contact:document.getElementById("userContact")?.textContent?.toString(),
  //  password:document.getElementById("userPassword")?.textContent?.toString()
 
  // }
  constructor(private http:HttpClient){

  }
   registerDetails(){
    console.log("saved");
    console.log(this.newUser);
    console.log(this.newVehicle);
    

    this.saveCustomer();
    this.saveVehicle();
   
  }
  public newUser:any={
    name:"",
    email:"",
    contact:"",
    password:""
  }
  
  private iud:string="" 
   saveCustomer(){
    this.newVehicle.userId=this.newUser.id;
    console.log((this.iud).toString());
    
    console.log(this.newUser);
     this.http.post("http://localhost:8080/user/add-user",this.newUser).subscribe((data)=>{
    //  alert("User Added!")
      
    
    })
  }
  public newVehicle:any={
    userId: "",//need to implement id generator
    model:"",
    licensePlate:"",
    madeYear:""
  }
  
    saveVehicle(){
      //this.newVehicle.userId=this.newUser.id;
      console.log(this.newVehicle.userId);
      
    console.log("inside vehicle");
    console.log((this.newUser.id).toString());
    
    this.http.post("http://localhost:8080/vehicle/save",this.newVehicle).subscribe((data)=>{
      //alert("Vehicle saved!")
      console.log(this.newVehicle);
      
    })

    
   }
  
}
