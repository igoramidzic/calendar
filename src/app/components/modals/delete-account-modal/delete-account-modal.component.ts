import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-delete-account-modal',
	templateUrl: './delete-account-modal.component.html',
	styleUrls: ['./delete-account-modal.component.sass']
})
export class DeleteAccountModalComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit() {
	}

	onDeleteAccount () {
		//BUG: Not sure what credential is supposed to look like???
		var credential = this.authService.afAuth.auth.signInWithEmailAndPassword('amidzicigor', 'password');
		console.log(credential);
		this.authService.deleteAccount()
			.then(success => this.router.navigate(['']))
			.catch(error => {
				console.log("Error here: ", error);
				this.authService.reauthenticate(credential)
					.then(success => this.router.navigate(['']))
					.catch(error => {
						console.log(error);
					})
			})
	}

}
