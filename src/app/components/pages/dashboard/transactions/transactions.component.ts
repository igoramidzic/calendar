import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Transaction } from '../../../../models/transaction';
import { TransactionsService } from '../../../../services/transactions.service';
import { AccountsService } from "../../../../services/accounts.service";
import { Account } from '../../../../models/account';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent implements OnInit {

	@Input('transactions') transactions: Transaction[];
	@Input('accounts') accounts: Account[];
	orderBy: string = 'timestamp';
	newTransactionToggle: boolean = false;

	constructor (private transactionsService: TransactionsService, private accountsService: AccountsService) { }

	ngOnInit () {

	}

	toggleNewTransaction () {
		this.newTransactionToggle = !this.newTransactionToggle;
	}

	// dynamicSort (property) {
	// 	var sortOrder = 1;
	// 	if(property[0] === "-") {
	// 			sortOrder = -1;
	// 			property = property.substr(1);
	// 	}
	// 	return function (a,b) {
	// 			var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
	// 			return result * sortOrder;
	// 	}
	// }
    //
	// changeOrder (orderBy) {
	// 	if (this.orderBy === orderBy) {
	// 		this.transactions.sort(this.dynamicSort('-' + orderBy));
	// 		this.orderBy = null;
	// 	} else {
	// 		this.orderBy = orderBy;
	// 		this.transactions.sort(this.dynamicSort(orderBy));
	// 	}
	// }

  onTrasactionComplete () {
	  this.newTransactionToggle = false;
  }

	deleteTransaction (transaction) {
    const toAccountIndex = this.accounts.map(function(o) { return o.id; }).indexOf(transaction.toAccount);
    const fromAccountIndex = this.accounts.map(function(o) { return o.id; }).indexOf(transaction.fromAccount);
    let toAccount = this.accounts[toAccountIndex];
    let fromAccount = this.accounts[fromAccountIndex];

		this.transactionsService.deleteTransaction(transaction)
      .then(() => {
		    this.accountsService.accountTransaction(toAccount.id, transaction.amount * -1);
		    if (transaction.fromAccount) {
		      this.accountsService.accountTransaction(fromAccount.id, transaction.amount)
        }
      })
	}
}

