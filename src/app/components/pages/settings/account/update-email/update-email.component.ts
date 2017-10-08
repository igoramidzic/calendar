import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';

@Component({
	selector: 'app-update-email',
	templateUrl: './update-email.component.html',
	styleUrls: ['./update-email.component.sass']
})
export class UpdateEmailComponent implements OnInit {

	updateEmailForm: FormGroup;
	newEmailControl: any;
	currentPasswordControl: any;
	submitBtnText: string;
	successfulUpdate: boolean;

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.setSubmitBtnValue('Update email');

		this.updateEmailForm = new FormGroup({
			'newEmail': new FormControl(null, [ Validators.required ])
		})

		this.newEmailControl = this.updateEmailForm.controls['newEmail'];

		this.authService.afAuth.authState.subscribe(user => {
			if (user) {
				this.newEmailControl.patchValue(user.email);
			}
		})

		this.updateEmailForm.valueChanges.subscribe(values => {
			this.newEmailControl = this.updateEmailForm.controls['newEmail'];
			this.currentPasswordControl = this.updateEmailForm.controls['currentPassword'];
		})
	}

	toggleCurrentEmailFormControl (bool) {
		if (bool) {
			const control = new FormControl(null, [ Validators.required ]);
			this.updateEmailForm.addControl('currentPassword', control);
		} else {
			this.updateEmailForm.removeControl('currentPassword');
		}
	}

	setSubmitBtnValue (value) {
		this.submitBtnText = value;
	}

	displaySuccessMessage () {
		this.updateEmailForm.setErrors({ 'successfulUpdate': true });
	}

	blipSuccessMessage () {
		this.successfulUpdate = true;
		setTimeout(() => {
			this.successfulUpdate = null;
		}, 2000)
	}

	blurFormControls () {
		// Not sure any other way to do it :(
		this.updateEmailForm.disable();
		this.updateEmailForm.enable();
	}

	submitting (bool) {
		this.updateEmailForm.setErrors({ 'submitting': bool });
		if (bool) {
			this.setSubmitBtnValue('updating..');
		} else {
			this.setSubmitBtnValue('Update email');
		}
	}
	patchCurrentPasswordControl () {
		this.currentPasswordControl.patchValue('');
	}

	setFormReauthError (error) {
		// Set timeout here because V4.2+ bug. 'ExpressionChangedAfterItHasBeenCheckedError'
		setTimeout(() => {
			this.updateEmailForm.setErrors({ 'reauthError': error });
		})
	}

	updateEmailSuccessful () {
		this.blurFormControls();
		this.toggleCurrentEmailFormControl(false);
		this.updateEmailForm.reset({
			'newEmail': this.newEmailControl.value
		});
		this.blipSuccessMessage();
	}

	reauthenticateUser (password) {
		this.authService.reauthenticate(password)
			.then(() => {
				this.submitting(false);
				this.setSubmitBtnValue('Change password');
				this.updateEmailSuccessful();
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

	updateEmail (newEmail) {
		this.authService.updateEmail(newEmail)
			.then(success => {
				this.submitting(false);
				this.updateEmailSuccessful();
			})
			.catch(error => {
				if (error.code === "auth/invalid-email") {
					this.submitting(false);
					this.updateEmailForm.setErrors({ 'emailError': 'is invalid.' });
				} else {
					if (this.currentPasswordControl) {
						this.reauthenticateUser(this.currentPasswordControl.value);
					} else {
						this.submitting(false);
						this.setSubmitBtnValue('Update email');
						this.toggleCurrentEmailFormControl(true);
						this.setFormReauthError('Please confirm current password')
					}
				}
			})
	}

	onUpdateUsersEmail () {
		if (this.updateEmailForm.valid) {
			this.submitting(true);
			this.setSubmitBtnValue('updating..');
			this.updateEmail(this.newEmailControl.value);
		}
	}

}
