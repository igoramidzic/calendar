import { Injectable } from '@angular/core';
import { MdDialog } from '@angular/material';
import { SignupModalComponent } from '../components/signup-modal/signup-modal.component';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';
import { DeleteAccountComponent } from '../components/modals/delete-account/delete-account.component';

@Injectable()
export class ModalService {

	constructor(private myModals: MdDialog) { }

	openSignupModal () {
		this.myModals.open(SignupModalComponent, {
			disableClose: true
		});
	}

	openLoginModal () {
		this.myModals.open(LoginModalComponent, {
			disableClose: true
		});
	}

	openDeleteAccountModal () {
		this.myModals.open(DeleteAccountComponent);
	}
	
}
