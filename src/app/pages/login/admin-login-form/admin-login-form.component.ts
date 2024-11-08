import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login-form',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './admin-login-form.component.html',
  styleUrl: './admin-login-form.component.css'
})
export class AdminLoginFormComponent {
  constructor(private http:HttpClient){}
  public login:any={}
  
    adminEmail:any=document.getElementById("userEmail")?.textContent?.toString();
    adminPassword:any=document.getElementById("userPassword")?.textContent?.toString();
    checkLogin(){
      console.log(this.login);
      this.http.get("http://localhost:8080/login/admin-login",this.login).subscribe((data)=>{
        console.log(this.http.request);
        
      })

  }
}
