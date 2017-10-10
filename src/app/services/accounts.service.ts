import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Accounts } from '../models/accounts';
import { StoreService } from './store.service';
import { AuthService } from './auth.service';

@Injectable()
export class AccountsService {

	accountsCollection: AngularFirestoreDocument<Accounts>;
	accounts: Observable<Accounts>;
	user: any;

	constructor(
		private afs: AngularFirestore,
		private authService: AuthService,
		private storeService: StoreService
	) {
		this.authService.afAuth.authState.subscribe(user => {
			if (user) {
				this.user = user;
				this.accountsCollection = this.afs.doc(`accounts/${this.user.uid}`);
				this.accounts = this.accountsCollection.valueChanges();
			}
		})
	}

	createAccountsData (doc, data) {
		this.storeService.setData('accounts', doc, data);
	}

	updateAccountData (doc, data) {
		this.storeService.updateData('accounts', doc, data);
	}

}