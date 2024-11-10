import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminNavComponent } from '../../common/admin-nav/admin-nav.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink,AdminNavComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
