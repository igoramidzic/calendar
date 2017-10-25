import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../../models/transaction';
import { Subscription } from 'rxjs';
import { TransactionsService } from '../../../../services/transactions.service';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent implements OnInit {

	transactions: Transaction[];
	transactionsSubscription: Subscription;
	exTransactions: Transaction[];

	constructor (private transactionsService: TransactionsService) { }
	
	ngOnInit () {
		this.transactionsSubscription = this.transactionsService.transactions.subscribe(transactions => {
			this.transactions = transactions;
		})
		this.exTransactions = [
			{ id: '1',
				description: 'McDonald\'s',
				category: 'Fast Food',
				amount: 5.45,
				account: 'Cash',
				timestamp: Date.now() },
				{ id: '2',
				description: 'Movie',
				category: 'Entertainment',
				amount: 10.70,
				account: 'Credit',
				timestamp: Date.now() },
				{ id: '3',
				description: 'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGG',
				category: 'Loans',
				amount: 240.32,
				account: 'Loan',
				timestamp: Date.now() },
				{ id: '4',
				description: 'Car payment Car payment',
				category: 'Bills',
				amount: 36712.56,
				account: 'Cash',
				timestamp: Date.now() }
		]
	}
}