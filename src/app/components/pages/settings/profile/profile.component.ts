import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

	user: any;
	profileDisplayNameForm: FormGroup;
	updateDisplayNameSuccess: boolean;
	updateDisplayNameError: boolean;

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.user = {
			displayName: 'Igor Amidzic'
		}

		this.profileDisplayNameForm = new FormGroup({
			'displayName': new FormControl(this.user.displayName)
		});
	}

	onUpdateUsersDisplayName () {
		var newDisplayName = this.profileDisplayNameForm.get('displayName').value;
		this.updateDisplayNameSuccess = false;
		this.updateDisplayNameError = false;

		this.authService.updateDisplayName(newDisplayName)
			.then(success => {
				this.updateDisplayNameSuccess = true;
				this.profileDisplayNameForm.reset({
					'displayName': newDisplayName
				});
				setTimeout(() => {
					this.updateDisplayNameSuccess = false;
				}, 1500)
			})
			.catch(error => {
				this.updateDisplayNameError = true;
			})
	}

}
