import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';

@Component({
	selector: 'app-update-password',
	templateUrl: './update-password.component.html',
	styleUrls: ['./update-password.component.sass']
})
export class UpdatePasswordComponent implements OnInit {

	updatePasswordForm: FormGroup;
	passwordControl: any;
	passwordConfirmControl: any;
	currentPasswordControl: any;
	submitBtnText: string;
	successfulUpdate: boolean;

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.setSubmitBtnValue('Change password');
		
		this.updatePasswordForm = new FormGroup({
			'password': new FormControl(null, [ Validators.required, Validators.minLength(6) ]),
			'passwordConfirm': new FormControl(null, [ Validators.required ])
		}, this.passwordMatchValidator)

		this.passwordControl = this.updatePasswordForm.controls['password'];
		this.passwordConfirmControl = this.updatePasswordForm.controls['passwordConfirm'];

		this.updatePasswordForm.valueChanges.subscribe(values => {
			this.passwordControl = this.updatePasswordForm.controls['password'];
			this.passwordConfirmControl = this.updatePasswordForm.controls['passwordConfirm'];
			this.currentPasswordControl = this.updatePasswordForm.controls['currentPassword'];
		})
	}

	toggleCurrentPasswordFormControl (bool) {
		if (bool) {
			const control = new FormControl(null, [ Validators.required ]);
			this.updatePasswordForm.addControl('currentPassword', control);
		} else {
			this.updatePasswordForm.removeControl('currentPassword');
		}
	}

	passwordMatchValidator (g: FormGroup) {
		if (g.get('password').value === g.get('passwordConfirm').value) {
			return null;
		} else {
			return { 'mismatch': true };
		}
	}

	setSubmitBtnValue (value) {
		this.submitBtnText = value;
	}

	submitting (bool) {
		this.updatePasswordForm.setErrors({ 'submitting': bool });
		if (bool) {
			this.setSubmitBtnValue('updating..');
		} else {
			this.setSubmitBtnValue('Change password');
		}
	}

	blipSuccessMessage () {
		this.successfulUpdate = true;
		setTimeout(() => {
			this.successfulUpdate = null;
		}, 2000)
	}

	blurFormControls () {
		// Not sure any other way to do it :(
		this.updatePasswordForm.disable();
		this.updatePasswordForm.enable();
	}

	setFormReauthError (error) {
		// Set timeout here because V4.2+ bug. 'ExpressionChangedAfterItHasBeenCheckedError'
		setTimeout(() => {
			this.updatePasswordForm.setErrors({ 'reauthError': error });
		})
	}
	
	patchCurrentPasswordControl () {
		this.currentPasswordControl.patchValue('');
	}

	passwordUpdateSuccessful () {
		this.blurFormControls();
		this.toggleCurrentPasswordFormControl(false);
		this.updatePasswordForm.reset();
		this.blipSuccessMessage();
	}

	updatePassword (password) {
		this.authService.updatePassword(password)
			.then(success => {
				this.submitting(false);
				this.passwordUpdateSuccessful();
			})
			.catch(error => {
				if (this.currentPasswordControl) {
					this.reauthenticateUser(this.currentPasswordControl.value);
				} else {
					this.submitting(false);
					this.setSubmitBtnValue('Change password');
					this.toggleCurrentPasswordFormControl(true);
					this.setFormReauthError('Please confirm current password')
				}
			})
	}

	reauthenticateUser (password) {
		this.authService.reauthenticate(password)
			.then(() => {
				this.submitting(false);
				this.setSubmitBtnValue('Change password');
				this.passwordUpdateSuccessful();
			})
			.catch(error => {
				this.submitting(false);
				this.setSubmitBtnValue('Change password');
				this.patchCurrentPasswordControl();
				if (error.code === 'auth/wrong-password') {
					this.currentPasswordControl.setErrors({ 'incorrect': 'is incorrect.' });
				} else if (error.code === 'auth/too-many-requests') {
					this.setFormReauthError('Too many attempts');
				}
			})
	}

	onChangePassword () {
		if (this.updatePasswordForm.valid) {
			this.submitting(true);
			this.setSubmitBtnValue('updating..');
			this.updatePassword(this.passwordControl.value);
		}
	}

}
