import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router) { }
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
		return this.authService.afAuth.authState
		.take(1)
		.map(authState => !!authState)
		.do(authenticated => {
			if (authenticated) {
				this.router.navigate(['dashboard']);
			}
		});
	}
}
