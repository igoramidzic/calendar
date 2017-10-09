import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ModalService } from '../../../services/modal.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {

	resetPasswordForm: FormGroup;
	emailControl: any;
	submitBtnText: string;
	successfulReset: boolean;
	title: string;

	constructor(private authService: AuthService, private modalService: ModalService, private router: Router) { }

	ngOnInit() {
		this.setSubmitBtnValue('RESET PASSWORD');
		this.title = "Forgot your password?";
		
		this.resetPasswordForm = new FormGroup({
			'email': new FormControl(null, [ Validators.required ])
		})
		
		this.emailControl = this.resetPasswordForm.controls['email'];

		this.resetPasswordForm.valueChanges.subscribe(values => {
			this.emailControl = this.resetPasswordForm.controls['email'];
		})
	}
	
	setSubmitBtnValue (value) {
		this.submitBtnText = value;
	}

	submitting (bool) {
		this.resetPasswordForm.setErrors({ 'submitting': bool });
		if (bool) {
			this.setSubmitBtnValue('Sending..');
		} else {
			this.setSubmitBtnValue('RESET PASSWORD');
		}
	}
	
	resetPassword (email) {
		this.authService.resetPassword(email)
			.then(() => {
				this.submitting(false);
				this.successfulReset = true;
				this.title = "Password reset email sent";
				
			})
			.catch(error => {
				this.submitting(false);
				if (error.code === "auth/invalid-email") {
					this.emailControl.setErrors({ 'emailError': 'Invalid email address.' })
				} else if (error.code === "auth/user-not-found") {
					this.emailControl.setErrors({ 'emailError': 'Email not found.' })
				} else {
					this.emailControl.setErrors({ 'emailError': 'Something went wrong.' })
				}
			})
	}
	
	onResetPassword () {
		if (this.resetPasswordForm.valid) {
			this.successfulReset = null;
			this.submitting(true);
			this.resetPassword(this.emailControl.value)
		}
	}
	
	onOpenLoginModal () {
		this.router.navigate(['']);
		this.modalService.openLoginModal();
	}

}
