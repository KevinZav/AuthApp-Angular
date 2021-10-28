import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
  constructor(private authS: AuthService, private route: Router) {}

  canActivate(): Observable<boolean> | boolean {

    return this.authS.validateToken()
      .pipe(
        tap( (valid: boolean) => {
          if (!valid) this.route.navigate(['/login']);
        }),
      );
  }
  canLoad(): Observable<boolean> | boolean  {

    return this.authS.validateToken()
      .pipe(
        tap( (valid: boolean) => {
          if (!valid) this.route.navigate(['/login']);
        }),
      );
  }
}
