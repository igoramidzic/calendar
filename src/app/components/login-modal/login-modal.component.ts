import { Component, OnInit, forwardRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
	selector: 'app-login-modal',
	templateUrl: './login-modal.component.html',
	styleUrls: ['./login-modal.component.sass']
})
export class LoginModalComponent implements OnInit {

	loginForm: FormGroup;
	loginWithEmailError: string;
	loginWithSocialError: string;
	complete: boolean;
	
	constructor(private authService: AuthService, private myModal: MdDialog, private router: Router) { }

	ngOnInit() {
		this.loginForm = new FormGroup({
			'email': new FormControl(null),
			'password': new FormControl(null)
		})
		this.complete = false;
	}

	onForgotPassword () {
		console.log("Forgot password");
	}

	onOpenSignupModal () {
		this.myModal.closeAll();
		setTimeout(() => {
			this.myModal.open(SignupModalComponent, {
				disableClose: true
			});
		}, 500)
	}

	successfulLogin () {
		this.complete = true;
		setTimeout(() => {
			this.router.navigate(['dashboard']);
			this.myModal.closeAll();
			this.loginForm.reset();
		}, 1000)
	}

	resetLoginErrors () {
		this.loginWithEmailError = null;
		this.loginWithSocialError = null;
	}

	onLoginWithEmail () {
		this.resetLoginErrors();
		
		var email = this.loginForm.get('email');
		var password = this.loginForm.get('password');

		if (!email.value) {
			email.setErrors({ 'empty': true });
		}
		if (!password.value) {
			password.setErrors({ 'empty': true });
		}

		if (email.value && password.value) {
			this.authService.loginUserWithEmail(email.value, password.value)
				.then(
					res => {
						this.successfulLogin();
					}
				)
				.catch(
					error => {
						if (error.code === "auth/invalid-email") {
							// ...
						}

						if (error.code === "auth/wrong-password") {
							this.loginWithEmailError = "Incorrect email or password.";
							password.patchValue('');
						} else if (error.code === "auth/too-many-requests") {
							this.loginWithEmailError = "Try again in a few seconds."
						}
						
						password.patchValue('');
					}
				)
		}
	}

	onLoginWithGoogle () {
		this.resetLoginErrors();
		this.authService.loginUserWithGoogle()
			.then(
				res => {
					this.successfulLogin();
				}
			).catch(
				error => {
					if (error.code === "auth/account-exists-with-different-credential") {
						this.loginWithSocialError = "An account associated with this email already exists. Please use a different method."
					}
				}
			);
	}

	onLoginWithFacebook () {
		this.resetLoginErrors();
		this.authService.loginUserWithFacebook()
			.then(
				res => {
					this.successfulLogin();
				}
			).catch(
				error => {
					if (error.code === "auth/account-exists-with-different-credential") {
						this.loginWithSocialError = "An account associated with this email already exists. Please use a different method."
					}
				}
			);
	}

}
