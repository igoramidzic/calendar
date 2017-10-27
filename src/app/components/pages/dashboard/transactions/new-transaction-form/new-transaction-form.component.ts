import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransactionsService } from '../../../../../services/transactions.service';

@Component({
	selector: 'app-new-transaction-form',
	templateUrl: './new-transaction-form.component.html',
	styleUrls: ['./new-transaction-form.component.sass']
})
export class NewTransactionFormComponent implements OnInit {

	@Input('accounts') accounts: Account[];
	newTransactionForm: FormGroup;
	activeType: string = 'expense';
	types: string[] = ['expense', 'income', 'transfer'];

	constructor(private transactionsService: TransactionsService) { }

	ngOnInit() {
		this.newTransactionForm = new FormGroup({
			'description': new FormControl(null, [ Validators.required ]),
			'category': new FormControl(null, [ Validators.required ]),
			'account': new FormControl(null, [ Validators.required ]),
			'amount': new FormControl(0, [ Validators.required ]),
			'timestamp': new FormControl(new Date(Date.now()), [ Validators.required ]),
		})
	}

	addTransaction (transaction) {
		this.transactionsService.createTransactionsData(transaction)
	}

	createNewTransaction () {

	}

}
