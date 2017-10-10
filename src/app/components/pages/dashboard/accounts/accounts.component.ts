import { Component, OnInit } from '@angular/core';
import { Accounts } from '../../../../models/accounts';
import { Subscription } from 'rxjs';
import { AccountsService } from '../../../../services/accounts.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.sass']
})
export class AccountsComponent implements OnInit {

	accounts: Accounts;
	data: any;
	amount: Number;
	user: any;
	accountsSubscription: Subscription;

	constructor(
		private accountsService: AccountsService,
		private authService: AuthService
	) {
		this.authService.afAuth.authState.subscribe(user => {
			if (user) {
				this.user = user;
			}
		})
	}
	
	ngOnInit () {
		this.accountsSubscription = this.accountsService.accounts.subscribe(accounts => {
			this.accounts = accounts;
		})
	}

	ngOnDestroy () {
		this.accountsSubscription.unsubscribe();
	}
	
	onStore (account) {
		this.accountsService.updateAccountData(this.user.uid, { [account]: Number(this.amount) });
	}
}
