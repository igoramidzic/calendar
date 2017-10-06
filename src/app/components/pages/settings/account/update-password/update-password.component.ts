import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';

@Component({
	selector: 'app-update-password',
	templateUrl: './update-password.component.html',
	styleUrls: ['./update-password.component.sass']
})
export class UpdatePasswordComponent implements OnInit {

	updatePasswordForm: FormGroup;
	updatePasswordSubmitted: boolean;
	updatePassword1FormError: string;
	updatePassword2FormError: string;
	updatePasswordAttempted: boolean;

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.updatePasswordForm = new FormGroup({
			'password': new FormControl(null),
			'confirmPassword': new FormControl(null)
		})

		this.updatePasswordForm.valueChanges.subscribe(res => {
			var password = this.updatePasswordForm.get('password').value;
			var confirmPassword = this.updatePasswordForm.get('confirmPassword').value

			if (this.updatePasswordAttempted) {
				if (password && password.length < 6) {
					this.updatePassword1FormError = "is too short.";
				} else {
					this.updatePassword1FormError = null;
				}
				
				if (password && !this.updatePassword1FormError && password != confirmPassword) {
					this.updatePassword2FormError = "does not match.";
				} else {
					this.updatePassword2FormError = null;
				}
			}
		})
	}
	
	onUpdateUsersPassword () {
		var password = this.updatePasswordForm.get('password').value;
		var confirmPassword = this.updatePasswordForm.get('confirmPassword').value;

		if (password) {
			if (password.length < 6) {
				this.updatePassword1FormError = "is too short.";
				this.updatePasswordAttempted = true;
			} else if (password != confirmPassword) {
				this.updatePassword2FormError = "does not match.";
				this.updatePasswordAttempted = true;
			} else {
				this.updatePasswordForm.reset();
				this.updatePasswordSubmitted = true;
				this.updatePasswordAttempted = null;
				setTimeout(() => {
					this.updatePasswordSubmitted = false;
				}, 1500)
			}
		}
	}

}
