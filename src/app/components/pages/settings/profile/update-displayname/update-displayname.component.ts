import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';

@Component({
	selector: 'app-update-displayname',
	templateUrl: './update-displayname.component.html',
	styleUrls: ['./update-displayname.component.sass']
})
export class UpdateDisplaynameComponent implements OnInit {

	updateDisplayNameForm: FormGroup;
	displayNameControl: any;
	submitBtnText: string;
	successfulUpdate: boolean;
	unsuccessfulUpdate: string;

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.setSubmitBtnValue('Update name');

		this.updateDisplayNameForm = new FormGroup({
			'displayName': new FormControl(null)
		});

		this.displayNameControl = this.updateDisplayNameForm.controls['displayName'];

		this.authService.afAuth.authState.subscribe(user => {
			if (user) {
				this.displayNameControl.patchValue(user.displayName)
			}
		})

		this.updateDisplayNameForm.valueChanges.subscribe(values => {
			this.displayNameControl = this.updateDisplayNameForm.controls['displayName'];
		})
	}

	setSubmitBtnValue (value) {
		this.submitBtnText = value;
	}

	submitting (bool) {
		this.updateDisplayNameForm.setErrors({ 'submitting': bool });
		if (bool) {
			this.setSubmitBtnValue('updating..');
		} else {
			this.setSubmitBtnValue('Update name');
		}
	}

	blurFormControls () {
		// Not sure any other way to do it :(
		this.updateDisplayNameForm.disable();
		this.updateDisplayNameForm.enable();
	}

	blipSuccessMessage () {
		this.successfulUpdate = true;
		setTimeout(() => {
			this.successfulUpdate = null;
		}, 2000)
	}

	updateDisplayNameSuccessful () {
		this.blurFormControls();
		this.blipSuccessMessage();
		this.updateDisplayNameForm.reset({
			'displayName': this.displayNameControl.value
		})
	}

	updateDisplayName (name) {
		this.authService.updateDisplayName(name)
			.then(() => {
				this.submitting(false);
				this.updateDisplayNameSuccessful();
			})
			.catch(error => {
				this.unsuccessfulUpdate = error.message;
			})
	}
	
	onUpdateUsersDisplayName () {
		this.unsuccessfulUpdate = null;
		this.submitting(true);
		this.updateDisplayName(this.displayNameControl.value);
	}

}
