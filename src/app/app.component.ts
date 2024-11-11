import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BookingComponent } from './pages/booking/booking.component';
import { ServicesComponent } from './pages/services/services.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { UserLoginFormComponent } from './pages/login/user-login-form/user-login-form.component';
import { AdminLoginFormComponent } from './pages/login/admin-login-form/admin-login-form.component';
import { LoginDashboardComponent } from './pages/login/login-dashboard/login-dashboard.component';
import { RepairManageComponent } from './tables/admin/repair-manage/repair-manage.component';
import { AdminNavComponent } from './pages/common/admin-nav/admin-nav.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBarComponent,DashboardComponent,BookingComponent,LoginDashboardComponent,ServicesComponent,VehicleComponent,RepairManageComponent,AdminNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Vehicle_service_Manage_FrontEnd';
}
