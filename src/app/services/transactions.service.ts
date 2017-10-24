import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Transaction } from '../models/transaction';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { StoreService } from './store.service';

@Injectable()
export class TransactionsService {

	transactionsCollection: AngularFirestoreCollection<Transaction>;
	transactions: Observable<Transaction[]>;
	user: any;

	constructor(
		private afs: AngularFirestore,
		private authService: AuthService,
		private storeService: StoreService
	) {
		this.authService.afAuth.authState.subscribe(user => {
			if (user) {
				this.user = user;
				this.transactionsCollection = this.afs.collection(`transactions/${this.user.uid}/transactions`);
				this.transactions = this.transactionsCollection.snapshotChanges()
					.map(actions => {
						return actions.map(a => {
							const data = a.payload.doc.data() as Transaction;
							const id = a.payload.doc.id;
							return { id, ...data };
						})
					})
			}
		})
	}

	createTransactionsData (data) {
		return new Promise((resolve, reject) => {
			this.storeService.afs.collection(`transactions/${this.user.uid}/transactions`)
			.add(data)
				.then(success => resolve(success))
				.catch(error => reject(error))
		})
	}

	updateTransactionsData (transactionID, data) {
		return new Promise((resolve, reject) => {
			this.storeService.afs.doc(`transactions/${this.user.uid}/transactions/${transactionID}`)
			.update(data)
				.then(() => resolve())
				.catch(error => reject(error))
		})
	}

	deleteTransaction (transactionID) {
		return new Promise((resolve, reject) => {
			this.storeService.afs.doc(`transactions/${this.user.uid}/transactions/${transactionID}`)
			.delete()
				.then(() => resolve())
				.catch(error => reject(error))
		})
	}

}
