import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

	user: any;
	title: any;

	constructor(private authService: AuthService, public router: Router, private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.user = {};

		this.activatedRoute.firstChild.data.subscribe(data => {
			this.title = data.title;
		})

		this.router.events.subscribe(() => {
			this.activatedRoute.firstChild.data.subscribe(data => {
				this.title = data.title;
			})
		})
		
		this.authService.afAuth.authState.subscribe(user => {
			if (!user) {
				return this.router.navigate(['']);
			}
			this.user = user;
		});
	}

}
