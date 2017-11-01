import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransactionsService } from '../../../../../services/transactions.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AccountsService } from "../../../../../services/accounts.service";

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
	categories: string[];
  @Output() transactionComplete:EventEmitter<boolean> = new EventEmitter();
  fromAccount: Account;

	constructor(
	  private transactionsService: TransactionsService,
    private accountsService: AccountsService,
    private http: Http) {
    this.getJSON().subscribe(data => this.categories=data, error => console.log(error));
  }

  public getJSON(): Observable<any> {
    return this.http.get("../../../../../../../assets/json/categories.json")
      .map((res:any) => res.json());
  }

	ngOnInit() {
		this.newTransactionForm = new FormGroup({
			'description': new FormControl(null, [ Validators.required ]),
			'category': new FormControl(null, [ Validators.required ]),
			'account': new FormControl(null, [ Validators.required ]),
			'amount': new FormControl(0, [ Validators.required ]),
			'timestamp': new FormControl(new Date(Date.now()), [ Validators.required ]),
		})
	}

	onTransactionComplete () {
    this.transactionComplete.emit(true);
  }

  storeTransaction (transaction) {
		return this.transactionsService.createTransactionsData(transaction);
	}

	updateAccountAmount (accID, data) {
    return this.accountsService.accountTransaction(accID, data);
	}

	storeTransactionAndAccount (transaction, accountTo, accountFrom) {
    this.storeTransaction(transaction)
      .then(() => {
	      if (accountFrom) {
	        this.updateAccountAmount(accountFrom.id, transaction.amount * -1);
        }
        this.updateAccountAmount(accountTo.id, transaction.amount);
        this.onTransactionComplete();
      })
  }

	onCreateNewTransaction () {
	  if (this.newTransactionForm.valid) {
      let description = this.newTransactionForm.controls['description'].value;
      let category = this.newTransactionForm.controls['category'].value;
      let toAccount = this.newTransactionForm.controls['account'].value;
      let fromAccount = null;
      if (this.activeType === 'transfer') {
        fromAccount = this.fromAccount;
      }
      let type = this.activeType;
      let timestamp = this.newTransactionForm.controls['timestamp'].value;
      let amount = this.newTransactionForm.controls['amount'].value;

      if (this.activeType === 'expense') {
        amount *= -1;
      }

      let transaction = {
        description,
        category,
        toAccount: toAccount.id,
        fromAccount: this.fromAccount ? this.fromAccount.id : null,
        amount,
        type,
        timestamp
      };

      this.storeTransactionAndAccount(transaction, toAccount, fromAccount);
    }

  }

}
