import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

	user: Object;
	currentSetting: string;

	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit() {
		this.user = this.authService.afAuth.authState.subscribe(user => {
			this.user = user;
		})
	}

}
