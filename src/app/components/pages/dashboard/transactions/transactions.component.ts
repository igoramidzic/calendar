import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Transaction } from '../../../../models/transaction';
import { Subscription } from 'rxjs';
import { TransactionsService } from '../../../../services/transactions.service';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent implements OnInit {

	@Input('transactions') transactions: Transaction[];
	@Input('accounts') accounts: Account[];
	orderBy: string = 'timestamp';
	newTransactionToggle: boolean = true;

	constructor (private transactionsService: TransactionsService) { }

	ngOnInit () {

	}

	toggleNewTransaction () {
		this.newTransactionToggle = !this.newTransactionToggle;
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



	deleteTransaction (transaction) {
		this.transactionsService.deleteTransaction(transaction);
	}
}

