import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransactionsService } from '../../../../../services/transactions.service';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

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

	constructor(private transactionsService: TransactionsService, private http: Http) {
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

    setTimeout(() => {
		  this.newTransactionForm.controls['account'].patchValue('hjk')
    }, 2000)
	}

	addTransaction (transaction) {
		this.transactionsService.createTransactionsData(transaction)
	}

	createNewTransaction () {

	}

	logAccount () {
    console.log(this.newTransactionForm.controls['account'].value)
  }

}
