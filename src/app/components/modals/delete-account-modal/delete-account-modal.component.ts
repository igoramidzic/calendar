import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';

@Component({
	selector: 'app-delete-account-modal',
	templateUrl: './delete-account-modal.component.html',
	styleUrls: ['./delete-account-modal.component.sass']
})
export class DeleteAccountModalComponent implements OnInit {

	deleteAccountForm: FormGroup;
	passwordControl: any;
	submitBtnText: string;

	constructor(private authService: AuthService, private dialog: MdDialog, private router: Router) { }

	ngOnInit() {
		this.deleteAccountForm = new FormGroup({
			'password': new FormControl(null, [ Validators.required ])
		})

		this.passwordControl = this.deleteAccountForm.controls['password'];
		
		this.deleteAccountForm.valueChanges.subscribe(values => {
			this.passwordControl = this.deleteAccountForm.controls['password'];
		})
	}

	setSubmitBtnValue (value) {
		this.submitBtnText = value;
	}

	submitting (bool) {
		this.deleteAccountForm.setErrors({ 'submitting': bool });
		if (bool) {
			this.setSubmitBtnValue('attempting..');
		} else {
			this.setSubmitBtnValue('Yes, delete my account.');
		}
	}

	deleteAccount () {
		this.authService.deleteAccount()
			.then(() => {
				this.submitting(false);
				this.dialog.closeAll();
			})
			.catch(error => {
				this.submitting(false);
				this.deleteAccountForm.setErrors({ 'mainFormError': 'Something went wrong' })
			})
	}

	reauthenticateUser (password) {
		this.authService.reauthenticate(password)
			.then(() => {
				this.deleteAccount();
			})
			.catch(error => {
				this.submitting(false);
				this.deleteAccountForm.reset();
				if (error.code === "auth/wrong-password") {
					this.deleteAccountForm.setErrors({ 'passwordError': 'Incorrect password'})
				} else if (error.code === "auth/too-many-requests") {
					this.deleteAccountForm.setErrors({ 'mainFormError': 'Too many attempts' })
				}
			})
	}

	onDeleteAccount () {
		if (this.deleteAccountForm.valid) {
			this.submitting(true);
			this.reauthenticateUser(this.passwordControl.value);
		}
	}

}
