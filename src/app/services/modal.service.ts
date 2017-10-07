import { Injectable } from '@angular/core';
import { MdDialog } from '@angular/material';
import { DeleteAccountModalComponent } from '../components/modals/delete-account-modal/delete-account-modal.component';
import { SignupModalComponent } from '../components/modals/signup-modal/signup-modal.component';
import { LoginModalComponent } from '../components/modals/login-modal/login-modal.component';

@Injectable()
export class ModalService {

	constructor(private myModals: MdDialog) { }

	openSignupModal () {
		const signupModalRef = this.myModals.open(SignupModalComponent, {
			disableClose: true
		});

		return signupModalRef;
	}

	openLoginModal () {
		const loginModalRef = this.myModals.open(LoginModalComponent, {
			disableClose: true
		});

		return loginModalRef;
	}

	openDeleteAccountModal () {
		this.myModals.open(DeleteAccountModalComponent);
	}
	
}
