import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ServicesComponent } from './pages/services/services.component';
import { BookingComponent } from './pages/booking/booking.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { VehicleRegistrationComponent } from './pages/vehicle-registration/vehicle-registration.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { UserLoginFormComponent } from './pages/login/user-login-form/user-login-form.component';
import { AdminLoginFormComponent } from './pages/login/admin-login-form/admin-login-form.component';
import { LoginDashboardComponent } from './pages/login/login-dashboard/login-dashboard.component';
import { UserAccountComponent } from './pages/user/user-account/user-account.component';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard/admin-dashboard.component';
import { BookingManageComponent } from './tables/admin/booking-manage/booking-manage.component';
import { UserManageComponent } from './tables/admin/user-manage/user-manage.component';
import { RepairManageComponent } from './tables/admin/repair-manage/repair-manage.component';
import { ManageVehicleComponent } from './tables/admin/manage-vehicle/manage-vehicle.component';


export const routes: Routes = [

    {
        path:"",
        component: DashboardComponent
    },{
        path:"services",
        component: ServicesComponent
    },{
        path:"booking",
        component:BookingComponent
    },{
        path:"vehicle",
        component:VehicleComponent
    },{
        path:"vehicle-registration",
        component: VehicleRegistrationComponent
    },{
        path:"user-registration",
        component: UserRegistrationComponent
    },{
        path:"login-dashboard",
        component: LoginDashboardComponent
    },{
        path: "user-login",
        component: UserLoginFormComponent
    },{
        path: "admin-login",
        component: AdminLoginFormComponent
    },{
        path:"user-account",
        component: UserAccountComponent
    },{
        path:"admin-dashboard",
        component:AdminDashboardComponent
    },{
        path:"booking-manage",
        component:BookingManageComponent
    },{
        path:"user-manage",
        component:UserManageComponent
    },{
        path: "repair-manage",
        component:RepairManageComponent
    },{
        path:"vehicle-manage",
        component:ManageVehicleComponent
    }
];
