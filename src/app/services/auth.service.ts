import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { StoreService } from './store.service';
import { AccountsService } from './accounts.service';

@Injectable()
export class AuthService {

	authState: any = null;

	constructor(
		public afAuth: AngularFireAuth, 
		private router: Router,
		private storeService: StoreService,
		private accountsService: AccountsService
	) {
		this.afAuth.authState.subscribe((auth) => {
			this.authState = auth;
		});
	}

	// Returns true if user is logged in
	get authenticated(): boolean {
		return this.authState !== null;
	}

	// New user set documents
	setNewUserDocuments (user) {
		this.accountsService.createNewUserAccounts(user);
	}

	// Signup | Email
	signupUserWithEmail (name: string, email: string, password: string) {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.createUserWithEmailAndPassword(email, password)
				.then(
					success => {
						this.updateDisplayName(name);
						this.setNewUserDocuments(success);
						resolve(success);
					}
				).catch(error => reject(error));
		});
	}

	// Login | Email
	loginUserWithEmail (email: string, password: string) {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.signInWithEmailAndPassword(email, password)
				.then(() => resolve())
				.catch(error => reject(error));
		})
	}

	// Send email verification
	sendEmailVerification () {
		if (!this.afAuth.auth.currentUser.emailVerified) {
			this.afAuth.auth.currentUser.sendEmailVerification();
		}
	}

	// Signup/Login | Google
	loginUserWithGoogle () {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
				.then(success => {
					this.setNewUserDocuments(success.user);
					resolve();
				})
				.catch(error => reject(error));
		})
	}

	// Signup/Login | Facebook
	loginUserWithFacebook () {
		// Return as promise instead of callback
		return new Promise((resolve, reject) => {
			this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
				.then(success => {
					this.setNewUserDocuments(success.user);
					resolve();
				})
				.catch(error => reject(error));
		})
		
	}

	// Logout
	logoutUser () {
		this.afAuth.auth.signOut();
	}

	// Delete account
	deleteAccount () {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.currentUser.delete()
				.then(() => resolve())
				.catch(error => reject(error))
		});
	}

	// Update displayName
	updateDisplayName (name) {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.currentUser.updateProfile({
				displayName: name,
				photoURL: ''
			}).then(() => resolve())
			.catch(error => reject(error))
		})
	}

	// Update email
	updateEmail (email) {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.currentUser.updateEmail(email)
				.then(() => resolve())
				.catch(error => reject(error))
		})
	}

	// Reset password
	resetPassword (email) {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.sendPasswordResetEmail(email)
				.then(() => resolve())
				.catch(error => reject(error))
		})
	}

	// Update password
	updatePassword (password) {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.currentUser.updatePassword(password)
				.then(() => resolve())
				.catch(error => reject(error))
		})
	}

	// Reauthenticate
	reauthenticate (password) {
		const credential = firebase.auth.EmailAuthProvider.credential(
			this.afAuth.auth.currentUser.email, 
			password
		);
		return new Promise((resolve, reject) => {
			this.afAuth.auth.currentUser.reauthenticateWithCredential(credential)
				.then(res => resolve())
				.catch(error => reject(error))
		})
	}
}