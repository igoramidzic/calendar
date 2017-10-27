import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountsService } from '../../../../services/accounts.service';
import { Account } from '../../../../models/account';
import { CurrencyPipe } from '@angular/common';

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.sass']
})
export class AccountsComponent implements OnInit {

	@Input('accounts') accounts: Account[];

	constructor(private accountsService: AccountsService) { }

	ngOnInit () {
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

}
