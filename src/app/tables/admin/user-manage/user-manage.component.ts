import { Component } from '@angular/core';
import { AdminNavComponent } from '../../../pages/common/admin-nav/admin-nav.component';
import { FetchBackend, HttpBackend, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-manage',
  standalone: true,
  imports: [AdminNavComponent],
  templateUrl: './user-manage.component.html',
  styleUrl: './user-manage.component.css'
})
export class UserManageComponent{
 

  constructor(private http:HttpClient){
    this.getAllUsers()
  }


  //------get all users---------------------------
  getAllUsers(){
    this.http.get("http://localhost:8080/user/get-all").subscribe(data=>{
      console.log(data);
      
    })
  }


}
