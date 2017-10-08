import { Component, OnInit, forwardRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
	selector: 'app-signup-modal',
	templateUrl: './signup-modal.component.html',
	styleUrls: ['./signup-modal.component.sass']
})
export class SignupModalComponent implements OnInit {

	signupForm: FormGroup;
	complete: boolean;
	signupWithEmailError: string;
	signupWithSocialError: string;
	hasDisplayNameError: boolean;
	hasEmailError: boolean;
	hasPasswordError: boolean;

	constructor(private authService: AuthService, private myModal: MdDialog, private router: Router) { }

	ngOnInit() {
		this.signupForm = new FormGroup({
			'displayName': new FormControl(null),
			'email': new FormControl(null),
			'password': new FormControl(null)
		})
		this.complete = false;
	}

	successfulSignup () {
		this.complete = true;
		setTimeout(() => {
			this.router.navigate(['dashboard']);
			this.signupForm.reset();
			this.myModal.closeAll();
		}, 1000)
	}

	resetSignupErrors () {
		this.signupWithEmailError = null;
		this.signupWithSocialError = null;
		this.hasEmailError = null;
		this.hasDisplayNameError = null;
		this.hasPasswordError = null;
	}

	onSignupWithEmail () {
		this.resetSignupErrors();
		
		var displayName = this.signupForm.get('displayName');
		var email = this.signupForm.get('email');
		var password = this.signupForm.get('password');

		if (!displayName.value) {
			this.hasDisplayNameError = true;
		}
		if (!email.value) {
			this.hasEmailError = true;
		}
		if (!password.value) {
			this.hasPasswordError = true;
		}

		if (displayName.value && email.value && password.value) {
			this.authService.signupUserWithEmail(displayName.value, email.value, password.value)
				.then(
					res => {
						this.successfulSignup();
					}
				)
				.catch(
					error => {
						if (error.code === "auth/email-already-in-use") {
							this.signupWithEmailError = "This email address has already been used.";
							this.hasEmailError = true;
							password.patchValue('');
						} else if (error.code === "auth/invalid-email") {
							this.signupWithEmailError = "Please enter a valid email.";
							this.hasEmailError = true;
							password.patchValue('');
						} else if (error.code === "auth/weak-password") {
							this.signupWithEmailError = "Password must be at least 6 characters.";
							this.hasPasswordError = true;
							password.patchValue('');
						} else {
							this.signupWithEmailError = "Something went wrong. Please try again.";
						}
					}
				)
		}
	}

	onSignupWithGoogle () {
		this.resetSignupErrors();
		this.authService.loginUserWithGoogle()
			.then(
				res => {
					this.successfulSignup();
				}
			).catch(
				error => {
					if (error.code === "auth/account-exists-with-different-credential") {
						this.signupWithSocialError = "An account associated with this email already exists. Please use a different method."
					} else {
						console.log(error)
					}
				}
			);
	}

	onSignupWithFacebook () {
		this.resetSignupErrors();
		this.authService.loginUserWithFacebook()
			.then(
				res => {
					this.successfulSignup();
				}
			).catch(
				error => {
					if (error.code === "auth/account-exists-with-different-credential") {
						this.signupWithSocialError = "An account associated with this email already exists. Please use a different method."
					}
				}
			);
	}
}
