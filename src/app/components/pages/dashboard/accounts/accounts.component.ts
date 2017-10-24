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
	total: number;
	accountsSubscription: Subscription;

	constructor(
		private accountsService: AccountsService,
	) {
	}
	
	ngOnInit () {
		this.accountsSubscription = this.accountsService.accounts.subscribe(accounts => {
			this.accounts = accounts;
			this.total = this.accounts[0].amount - this.accounts[1].amount;
		})
	}

	ngOnDestroy () {
		this.accountsSubscription.unsubscribe();
	}

}
