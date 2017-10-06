import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

	constructor (private authService: AuthService, private router: Router) { }
	
	canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.authService.afAuth.authState
		.take(1)
		.map(authState => !!authState)
		.do(authenticated => {
			if (!authenticated) {
				this.router.navigate(['']);
			}
		});
	}

	canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.canActivate(route, state);
	}
}
