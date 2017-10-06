import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {

	user: any;

	updateEmailForm: FormGroup;
	updateEmailSubmitted: boolean;
	updateEmailFormError: string;

	updatePasswordForm: FormGroup;
	updatePasswordSubmitted: boolean;
	updatePassword1FormError: string;
	updatePassword2FormError: string;
	updatePasswordAttempted: boolean;
	
	constructor(private modalService: ModalService) { }

	ngOnInit() {
		this.user = {
			email: 'amidzicigor@yahoo.com'
		}

		this.updateEmailForm = new FormGroup({
			'email': new FormControl(this.user.email, [ Validators.required ])
		})

		this.updateEmailForm.valueChanges.subscribe(res => {
			if (this.updateEmailForm.controls.email.errors) {
				this.updateEmailFormError = 'is required.';
			} else {
				this.updateEmailFormError = null;
			}
		})
		
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
	
	onUpdateUsersEmail () {
		var newEmail = this.updateEmailForm.get('email').value;

		if (newEmail === 'invalid') { // Check if Firebase returns invalid email error
			this.updateEmailFormError = 'is invalid.';
		} else if (newEmail === 'taken') { // Check if Firebase returns taken email error
			this.updateEmailFormError = 'is already taken.';
		} else {
			this.user.email = newEmail;
			this.updateEmailForm.reset({
				'email': this.user.email
			});
			this.updateEmailSubmitted = true;
			setTimeout(() => {
				this.updateEmailSubmitted = false;
			}, 1500)
		}
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

	onOpenDeleteAccountModal () {
		this.modalService.openDeleteAccountModal();
	}
}
