import { Component, OnInit, OnDestroy } from '@angular/core';
import { Transaction } from '../../../../models/transaction';
import { Subscription } from 'rxjs';
import { TransactionsService } from '../../../../services/transactions.service';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent implements OnInit, OnDestroy {

	transactions: Transaction[];
	transactionsSubscription: Subscription;
	orderBy: string = 'timestamp';

	constructor (private transactionsService: TransactionsService) { }
	
	ngOnInit () {
		this.transactionsSubscription = this.transactionsService.transactions.subscribe(transactions => {
			this.transactions = transactions;
		})
	}

	ngOnDestroy () {
		this.transactionsSubscription.unsubscribe();
	}

	addTransaction () {
		this.transactionsService.createTransactionsData({
			description: 'EEEEEEEEEEEE',
			category: 'Fast food',
			account: 'cash',
			amount: 5.45,
			timestamp: Date.now()
		})
	}

	dynamicSort (property) {
		var sortOrder = 1;
		if(property[0] === "-") {
				sortOrder = -1;
				property = property.substr(1);
		}
		return function (a,b) {
				var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
				return result * sortOrder;
		}
	}

	changeOrder (orderBy) {
		if (this.orderBy === orderBy) {
			this.transactions.sort(this.dynamicSort('-' + orderBy));
			this.orderBy = null;
		} else {
			this.orderBy = orderBy;
			this.transactions.sort(this.dynamicSort(orderBy));
		}
	}
}

