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
	updatePasswordSuccess: boolean;
	updatePasswordError: string;
	updatePassword1FormError: string;
	updatePassword2FormError: string;
	updatePasswordAttempted: boolean;
	btnMessage: string;
	currentlySaving: boolean;
	requiresRecentLogin: boolean;

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.btnMessage = 'Change password';

		this.updatePasswordForm = new FormGroup({
			'password': new FormControl(null),
			'confirmPassword': new FormControl(null),
			'currentPassword': new FormControl(null)
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

	passwordSavedSuccessfully () {
		this.updatePasswordForm.reset();
		this.btnMessage = 'Update password';
		this.currentlySaving = null;
		this.updatePasswordSuccess = true;
		this.updatePasswordAttempted = null;
		this.updatePasswordForm.disable();
		this.updatePasswordForm.enable();
		this.requiresRecentLogin = false;
		this.updatePasswordError = null;
		setTimeout(() => {
			this.updatePasswordSuccess = false;
		}, 2000)
	}
	
	onUpdateUsersPassword () {
		this.updatePasswordAttempted = true;
		var password = this.updatePasswordForm.get('password').value;
		var confirmPassword = this.updatePasswordForm.get('confirmPassword').value;
		this.btnMessage = 'updating..';
		this.currentlySaving = true;

		if (password) {
			if (password.length < 6) {
				this.updatePassword1FormError = "is too short.";
				this.btnMessage = 'Update password';
				this.currentlySaving = null;
			} else if (password != confirmPassword) {
				this.updatePassword2FormError = "does not match.";
				this.btnMessage = 'Update password';
				this.currentlySaving = null;
			} else {
				this.authService.updatePassword(password)
				.then(() => {
					this.passwordSavedSuccessfully();
				})
				.catch(error => {
					this.btnMessage = 'Update password';
					this.currentlySaving = null;
					if (error.code === "auth/requires-recent-login") {
						this.updatePasswordForm.disable();
						this.updatePasswordForm.enable();
						this.requiresRecentLogin = true;
						this.updatePasswordError = "Please confirm your password"
						const currentPassword = this.updatePasswordForm.get('currentPassword').value;
						if (currentPassword) {
							this.authService.reauthenticate(currentPassword)
							.then(() => {
								this.passwordSavedSuccessfully();
							})
							.catch(error => {
								if (error.code === "auth/wrong-password") {
									this.updatePasswordError = "Incorrect password."
								} else if (error.code === "auth/too-many-requests") {
									this.updatePasswordError = "Too many attempts"
								}
								console.log(error);
							})
						}
					} else if (error.code === "auth/weak-password") {
						this.updatePassword1FormError = "is too short.";
					}
				})
			}
		}
	}

}
