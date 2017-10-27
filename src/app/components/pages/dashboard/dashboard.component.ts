import { Component, OnInit, OnDestroy } from '@angular/core';
import { Transaction } from '../../../models/transaction';
import { Subscription } from 'rxjs';
import { TransactionsService } from '../../../services/transactions.service';
import { AccountsService } from '../../../services/accounts.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, OnDestroy {

	accounts: Account[];
	accountsSubscription: Subscription;
	transactions: Transaction[];
	transactionsSubscription: Subscription;

	constructor (
		private transactionsService: TransactionsService, 
		private accountsService: AccountsService) { }

	ngOnInit () {
		this.accountsSubscription = this.accountsService.accounts.subscribe(accounts => {
			this.accounts = accounts;
			this.accounts.forEach
		})
		this.transactionsSubscription = this.transactionsService.transactions.subscribe(transactions => {
			this.transactions = transactions;
		})
	}

	ngOnDestroy () {
		this.transactionsSubscription.unsubscribe();
		this.accountsSubscription.unsubscribe();
	}

}