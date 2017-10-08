import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

	user: any;

	constructor(private authService: AuthService, public router: Router) { }

	ngOnInit() {
		this.user = {};
		
		this.authService.afAuth.authState.subscribe(user => {
			if (!user) {
				return this.router.navigate(['']);
			}
			this.user = user;
		});
	}

}
