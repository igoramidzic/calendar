import { Component, OnInit, OnDestroy } from '@angular/core';
import { Accounts } from '../../../models/accounts';
import { AccountsService } from '../../../services/accounts.service';
import { AuthService } from '../../../services/auth.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

	accounts: Accounts;
	data: any;
	amount: Number;
	user: any;

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
		this.accountsService.accounts.subscribe(accounts => {
			this.accounts = accounts;
		})
	}
	
	onStore (account) {
		this.accountsService.updateAccountData(this.user.uid, { [account]: Number(this.amount) });
	}

}