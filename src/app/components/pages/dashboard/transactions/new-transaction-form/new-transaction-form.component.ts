import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransactionsService } from '../../../../../services/transactions.service';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {AccountsService} from "../../../../../services/accounts.service";

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
    return this.accountsService.updateAccountData(accID, data);
	}

	storeTransactionAndAccount (transaction, account) {
	  let newAccountAmount = account.amount + transaction.amount;
	  let accountData = { id: account.id, data: { amount: newAccountAmount } };

	  this.storeTransaction(transaction)
      .then(() => {
        this.updateAccountAmount(accountData.id, accountData.data)
          .then(() => {
            this.onTransactionComplete();
          })
      })
  }

	onCreateNewTransaction () {
	  if (this.newTransactionForm.valid) {
      let description = this.newTransactionForm.controls['description'].value;
      let category = this.newTransactionForm.controls['category'].value;
      let account = this.newTransactionForm.controls['account'].value;
      let timestamp = this.newTransactionForm.controls['timestamp'].value;
      let amount = this.newTransactionForm.controls['amount'].value;

      if (this.activeType === 'expense') {
        amount *= -1;
      }

      let transaction = {
        description,
        category,
        account: account.id,
        amount,
        timestamp
      }

      this.storeTransactionAndAccount(transaction, account);
    }

  }

}
