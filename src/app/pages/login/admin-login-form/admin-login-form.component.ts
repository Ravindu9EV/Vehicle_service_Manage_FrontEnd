import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login-form',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './admin-login-form.component.html',
  styleUrl: './admin-login-form.component.css'
})
export class AdminLoginFormComponent {
  constructor(private http:HttpClient,private router:Router){}
  public loginDetails:any={}
  
    adminEmail:any=document.getElementById("userEmail")?.textContent?.toString();
    adminPassword:any=document.getElementById("userPassword")?.textContent?.toString();
  checkLogin(){
      console.log(this.loginDetails);
      this.http.post("http://localhost:8080/login/admin-login",this.loginDetails).subscribe((data)=>{
        console.log(data);
        if(data){
            this.router.navigate(['/admin-dashboard'])
        }else{
          alert("Invalid Email/Password!!!!")
        }
        
      })

  }
}
