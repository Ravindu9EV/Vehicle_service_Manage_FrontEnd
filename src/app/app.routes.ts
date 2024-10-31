import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ServicesComponent } from './pages/services/services.component';
import { BookingComponent } from './pages/booking/booking.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';

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
    }
];
