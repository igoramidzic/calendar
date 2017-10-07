import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';

@Component({
	selector: 'app-update-email',
	templateUrl: './update-email.component.html',
	styleUrls: ['./update-email.component.sass']
})
export class UpdateEmailComponent implements OnInit {

	user: any;
	
	updateEmailForm: FormGroup;
	updateEmailSubmitted: boolean;
	updateEmailFormSuccess: boolean;
	updateEmailFormError: string;
	passwordRequired: string;
	requiresRecentLogin: boolean;
	passwordError: string;
	btnMessage: string;
	currentlySaving: boolean;

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.btnMessage = 'Update email';
		
		this.authService.afAuth.authState.subscribe(user => {
			this.user = user;
			if (user) {
				this.updateEmailForm.get('email').patchValue(this.user.email);
			}
		})

		this.updateEmailForm = new FormGroup({
			'email': new FormControl(null),
			'password': new FormControl(null)
		})

		this.updateEmailForm.valueChanges.subscribe(res => {
			if (this.updateEmailForm.controls.email.errors) {
				this.updateEmailFormError = 'is required.';
			} else {
				this.updateEmailFormError = null;
			}
		})
	}

	onUpdateUsersEmail () {
		var newEmail = this.updateEmailForm.get('email').value;
		this.updateEmailForm.disable();
		this.btnMessage = "updating..";
		this.currentlySaving = true;

		this.authService.updateEmail(newEmail)
			.then(success => {
				this.updateEmailForm.reset({
					'email': newEmail
				});
				this.updateEmailForm.enable();
				this.updateEmailFormSuccess = true;
				this.requiresRecentLogin = null;
				this.currentlySaving = null;
				this.btnMessage = "Update email";
				setTimeout(() => {
					this.updateEmailFormSuccess = false;
				}, 1500)
			})
			.catch(error => {
				this.btnMessage = "Update email";
				this.currentlySaving = null;
				this.updateEmailForm.enable();
				console.log(error);
				if (error.code === "auth/requires-recent-login") {
					this.requiresRecentLogin = true;
					this.passwordRequired = "Please enter your password"
					setTimeout(() => {
						this.passwordRequired = null;
					}, 1500)
				} 
				if (error.code === "auth/invalid-email") {
					this.updateEmailFormError = "is invalid.";
				} else if (error.code === "auth/email-already-in-use") {
					this.updateEmailFormError = "is already taken.";
				}
			})
	}

}
