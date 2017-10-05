import { Component, OnInit, forwardRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { LoginModalComponent } from '../login-modal/login-modal.component';

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

	constructor(private authService: AuthService, private myModal: MdDialog, private router: Router) { }

	ngOnInit() {
		this.signupForm = new FormGroup({
			'first_name': new FormControl(null),
			'last_name': new FormControl(null),
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

	resetLoginErrors () {
		this.signupWithEmailError = null;
		this.signupWithSocialError = null;
	}

	onOpenLoginModal () {
		this.myModal.closeAll();
		setTimeout(() => {
			this.myModal.open(LoginModalComponent, {
				disableClose: true
			});
		}, 500)
	}

	onSignupWithEmail () {
		this.resetLoginErrors();
		
		var first = this.signupForm.get('first_name');
		var last = this.signupForm.get('last_name');
		var email = this.signupForm.get('email');
		var password = this.signupForm.get('password');

		if (!first.value) {
			first.setErrors({ 'empty': true });
		}
		if (!last.value) {
			last.setErrors({ 'empty': true });
		}
		if (!email.value) {
			email.setErrors({ 'empty': true });
		}
		if (!password.value) {
			password.setErrors({ 'empty': true });
		}

		if (first.value && last.value && email.value && password.value) {
			this.authService.signupUserWithEmail(email.value, password.value)
				.then(
					res => {
						this.successfulSignup();
					}
				)
				.catch(
					error => {
						if (error.code === "auth/email-already-in-use") {
							this.signupWithEmailError = "This email address has already been used.";
							email.setErrors({ 'duplicate': true });
							password.patchValue('');
						} else if (error.code === "auth/invalid-email") {
							this.signupWithEmailError = "Please enter a valid email.";
							email.setErrors({ 'duplicate': true });
							password.patchValue('');
						} else if (error.code === "auth/weak-password") {
							this.signupWithEmailError = "Password must be at least 6 characters.";
							password.patchValue('');
							password.setErrors({ 'tooShort': true });
						} else {
							this.signupWithEmailError = "Something went wrong. Please try again.";
						}
					}
				)
		}
	}

	onSignupWithGoogle () {
		this.resetLoginErrors();
		this.authService.loginUserWithGoogle()
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

	onSignupWithFacebook () {
		this.resetLoginErrors();
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
