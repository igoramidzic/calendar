import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountsService } from '../../../../services/accounts.service';
import { AuthService } from '../../../../services/auth.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Account } from '../../../../models/account';
import { trigger, state, style } from '@angular/animations';

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.sass'],
	animations: [
		trigger('accountState', [
			state('close', style({
				backgroundColor: 'red',
				transform: 'translateX(0)'
			})),
			state('open', style({
				backgroundColor: 'blue',
				transform: 'translateX(100px)'
			}))
		])
	]
})
export class AccountsComponent implements OnInit, OnDestroy {

	accountTypes: Account[][] = [ null, null, null ];
	state = 'close';
	cashTotal: number = 0;
	creditTotal: number = 0;
	assetsTotal: number = 0;
	cashAccountsSubscription: Subscription;
	creditAccountsSubscription: Subscription;
	assetsAccountsSubscription: Subscription;

	constructor(
		private accountsService: AccountsService,
	) {
	}
	
	ngOnInit () {
		this.cashAccountsSubscription = this.accountsService.cashAccounts.subscribe(cashAccounts => {
			this.accountTypes[0] = cashAccounts;
			this.cashTotal = 0;
			cashAccounts.forEach(account => {
				this.cashTotal += account.amount;
			})
		})

		this.creditAccountsSubscription = this.accountsService.creditAccounts.subscribe(creditAccounts => {
			this.accountTypes[1] = creditAccounts;
			this.creditTotal = 0;
			creditAccounts.forEach(account => {
				this.creditTotal += account.amount;
			})
		})

		this.assetsAccountsSubscription = this.accountsService.assetsAccounts.subscribe(assetsAccounts => {
			this.accountTypes[2] = assetsAccounts;
			this.assetsTotal = 0;
			assetsAccounts.forEach(account => {
				this.assetsTotal += account.amount;
			})
		})
	}

	ngOnDestroy () {
		this.cashAccountsSubscription.unsubscribe();
		this.creditAccountsSubscription.unsubscribe();
		this.assetsAccountsSubscription.unsubscribe();
	}

	onToggleAccount () {
		if (this.state == 'close') {
			this.state = 'open'
		} else {
			this.state = 'close';
		}
	}

}
