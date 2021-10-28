import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private authS: AuthService) { }

  ngOnInit(): void {
    this.authS.validateToken().subscribe(resp => {
      if (!resp) this.logout();
    });
  }

  get auth() {
    return this.authS.auth;
  }

  logout() {
    this.authS.logout();
    this.router.navigate(['/auth', 'login']);
  }

}
