import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../../models/transaction';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { TransactionsService } from '../../../../services/transactions.service';
import { Account } from '../../../../models/account';
import { AccountsService } from '../../../../services/accounts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent implements OnInit {

	// user: any;
	// transactions: Transaction[];
	// transactionsSubscription: Subscription;
	// accounts: Account[];
	// accountsSubscription: Subscription;
	// createTransactionForm: FormGroup;
	// nameControl: any;
	// categoryControl: any;
	// amountControl: any;
	// accountControl: any;

	constructor(
		private transactionsService: TransactionsService,
		private authService: AuthService,
		private accountsService: AccountsService
	) {
		// this.authService.afAuth.authState.subscribe(user => {
		// 	if (user) {
		// 		this.user = user;
		// 	}
		// })
	}
	
	ngOnInit () {
		// this.transactionsSubscription = this.transactionsService.transactions.subscribe(transactions => {
		// 	this.transactions = transactions;
		// })
		
		// this.accountsSubscription = this.accountsService.accounts.subscribe(accounts => {
		// 	this.accounts = accounts;
		// })
		
		// this.createTransactionForm = new FormGroup({
		// 	'name': new FormControl(null, [ Validators.required ]),
		// 	'category': new FormControl(null, [ Validators.required ]),
		// 	'amount': new FormControl(null, [ Validators.required ]),
		// 	'account': new FormControl(null, [ Validators.required ])
		// })
		
		// this.setControls();
		
		// this.createTransactionForm.valueChanges.subscribe(() => {
		// 	this.setControls();
		// })
	}

	// ngOnDestroy () {
	// 	this.transactionsSubscription.unsubscribe();
	// 	this.accountsSubscription.unsubscribe();
	// }
	
	// setControls () {
	// 	this.nameControl = this.createTransactionForm.controls['name'];
	// 	this.categoryControl = this.createTransactionForm.controls['category'];
	// 	this.amountControl = this.createTransactionForm.controls['amount'];
	// 	this.accountControl = this.createTransactionForm.controls['account'];
	// }
	
	// createTransaction () {
	// 	if (this.createTransactionForm.valid) {
	// 		this.transactionsService.createTransactionsData({
	// 			name: this.nameControl.value,
	// 			category: this.categoryControl.value,
	// 			amount: Number(this.amountControl.value),
	// 			account: this.accountControl.value,
	// 			timestamp: new Date()
	// 		})
	// 			.then(() => {
	// 				this.createTransactionForm.reset();
	// 			})
	// 			.catch(error => {
	// 				console.log(error);
	// 			})
	// 	}
	// }
	
	// updateTransaction (index) {
	// 	let id = this.transactions[index].id;
	// 	let data = {
			
	// 	}
	// 	this.transactionsService.updateTransactionsData(id, data)
	// 		.then(() => {
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		})
	// }
	
	// deleteTransaction (id) {
	// 	this.transactionsService.deleteTransaction(id);
	// }

}
