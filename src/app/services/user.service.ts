import { Injectable } from '@angular/core';
import { AccountsService } from './accounts.service';

@Injectable()
export class UserService {

	constructor(private accountsService: AccountsService) { }

	createUserDocuments (user) {
		this.accountsService.createAccountsData(user.uid, {});
	}

}
