import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class StoreService {

	constructor(public afs: AngularFirestore) { }

	setData (collection, doc, data) {
		return new Promise((resolve, reject) => {
			this.afs.doc(`${collection}/${doc}`).set(data)
				.then(() => resolve())
				.catch(error => reject(error))
		})
	}

	updateData (collection, doc, data) {
		if (doc) {
			return new Promise((resolve, reject) => {
				this.afs.doc(`${collection}/${doc}`).update(data)
					.then(() => resolve())
					.catch(error => reject(error))
			})
		} else {
			return new Promise((resolve, reject) => {
				this.afs.doc(`${collection}`).update(data)
					.then(() => resolve())
					.catch(error => reject(error))
			})
		}
	}

}