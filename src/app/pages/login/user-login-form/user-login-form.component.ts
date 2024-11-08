import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.css'
})
export class UserLoginFormComponent {
  constructor(private http:HttpClient){}
  public login:any={}
 
   userEmail:any=document.getElementById("userEmail")?.textContent?.toString();
   userPassword:any=document.getElementById("userPassword")?.textContent?.toString();
  checkLogin(){
    console.log(this.login);
    this.http.get("http://localhost:8080/login/user-login",this.login).subscribe((data)=>{
      console.log(data);
      
    })
  
 
}
  
}
