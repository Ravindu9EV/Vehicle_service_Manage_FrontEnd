import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { AdminLoginFormComponent } from '../admin-login-form/admin-login-form.component';

@Component({
  selector: 'app-login-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-dashboard.component.html',
  styleUrl: './login-dashboard.component.css'
})
export class LoginDashboardComponent {
      
}
