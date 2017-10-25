import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountsService } from '../../../../services/accounts.service';
import { Account } from '../../../../models/account';
import { CurrencyPipe } from '@angular/common';

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.sass']
})
export class AccountsComponent implements OnInit, OnDestroy {

	accounts: Account[];
	accountsSubscription: Subscription;
	

	constructor(private accountsService: AccountsService) { }

	ngOnInit () {
		this.accountsSubscription = this.accountsService.accounts.subscribe(accounts => {
			this.accounts = accounts;
			this.accounts.forEach
		})
	}

	get assets () {
		let assets = 0;
		if (this.accounts)
			this.accounts.forEach(account => {
				if (account.amount > 0)
					assets += account.amount;
			})
		return assets;
	}

	get debts () {
		let debts = 0;
		if (this.accounts)
			this.accounts.forEach(account => {
				if (account.amount < 0)
					debts += account.amount;
			})
		return debts;
	}

	get total () {
		return this.assets + this.debts;
	}
	
	ngOnDestroy () {
		this.accountsSubscription.unsubscribe();
	}

}
