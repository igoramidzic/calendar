import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

	user: any;
	profileNameForm: FormGroup;
	updateNameSubmitted: boolean;

	constructor() { }

	ngOnInit() {
		this.user = {
			firstName: 'Igor',
			lastName: 'Amidzic'
		}

		this.profileNameForm = new FormGroup({
			'firstName': new FormControl(this.user.firstName),
			'lastName': new FormControl(this.user.lastName)
		});
	}

	onUpdateUsersName () {
		var first = this.profileNameForm.get('firstName').value;
		var last = this.profileNameForm.get('lastName').value;
		this.user.firstName = first;
		this.user.lastName = last;
		this.profileNameForm.reset({
			'firstName': this.user.firstName,
			'lastName': this.user.lastName
		});
		this.updateNameSubmitted = true;
		setTimeout(() => {
			this.updateNameSubmitted = false;
		}, 1500)
	}

}
