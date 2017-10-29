import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { StoreService } from './store.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../models/account';

@Injectable()
export class AccountsService {

	accounts: Observable<Account[]>;
	user: any;

	constructor(
		private afs: AngularFirestore,
		private afAuth: AngularFireAuth,
		private storeService: StoreService
	) {
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.user = user;
				this.accounts = this.afs.collection(`accounts/${this.user.uid}/accounts`)
					.snapshotChanges()
					.map(actions => {
						return actions.map(a => {
							const data = a.payload.doc.data() as Account;
							const id = a.payload.doc.id;
							return { id, ...data };
						})
					})
			}
		})
	}

	createNewUserAccounts (user) {
		let assetData = { amount: 0, type: 'asset' };
		let debtData = { amount: 0, type: 'debt'};
		this.storeService.afs.firestore.doc(`accounts/${user.uid}`).get()
			.then(doc => {
				if (!doc.exists) {
					this.storeService.afs.doc(`accounts/${this.user.uid}`).set({})
					this.storeService.afs.doc(`accounts/${this.user.uid}/accounts/cash`).set(assetData)
					this.storeService.afs.doc(`accounts/${this.user.uid}/accounts/property`).set(assetData);
					this.storeService.afs.doc(`accounts/${this.user.uid}/accounts/credit`).set(debtData);
					this.storeService.afs.doc(`accounts/${this.user.uid}/accounts/loans`).set(debtData);
				}
			})
	}

	createAccountsData (data) {
		return new Promise((resolve, reject) => {
			this.storeService.afs.collection(`accounts/${this.user.uid}/accounts`).add(data)
				.then(() => resolve())
				.catch(error => reject(error))
		})
	}

	updateAccountData (accID, data) {
		return new Promise((resolve, reject) => {
			this.storeService.afs.doc(`accounts/${this.user.uid}/accounts/${accID}`)
			.update(data)
				.then(() => resolve())
				.catch(error => reject(error))
		})
	}

	deleteAccount (accID) {
		return new Promise((resolve, reject) => {
			this.storeService.afs.doc(`accounts/${this.user.uid}/accounts/cash/accounts/${accID}`).delete()
				.then(() => resolve())
				.catch(error => reject(error))
		})
	}

}
