import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class AuthService implements OnInit {

	constructor(public afAuth: AngularFireAuth, private afdb: AngularFireDatabase, private router: Router) { }

	ngOnInit() {
	}

	// Signup | Email
	signupUserWithEmail (name: string, email: string, password: string) {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.createUserWithEmailAndPassword(email, password)
				.then(
					success => {
						this.updateDisplayName(name);
						resolve(success);
					}
				).catch(error => reject(error));
		});
	}

	// Store user's first/last name in database
	storeUserName (uid, first, last) {
		return new Promise((resolve, reject) => {
			this.afdb.database.ref('users/').set({
				uid: uid,
				first_name: first,
				last_name: last
			}).then(success => resolve())
				.catch(error => reject(error));
		})
	}

	// Login | Email
	loginUserWithEmail (email: string, password: string) {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.signInWithEmailAndPassword(email, password)
				.then(success => resolve(success))
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
				.then(success => resolve())
				.catch(error => reject(error));
		})
	}

	// Signup/Login | Facebook
	loginUserWithFacebook () {
		// Return as promise instead of callback
		return new Promise((resolve, reject) => {
			this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
				.then(success => resolve())
				.catch(error => reject(error));
		})
		
	}

	// Logout
	logoutUser () {
		this.afAuth.auth.signOut();
		this.router.navigate(['']);
	}

	// Delete account
	deleteAccount () {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.currentUser.delete()
				.then(res => resolve())
				.catch(error => {
					reject(error);
				})
		});
	}

	// Update displayName
	updateDisplayName (name) {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.currentUser.updateProfile({
				displayName: name,
				photoURL: ''
			}).then(success => resolve())
			.catch(error => {
				reject(error);
			})
		})
	}

	// Update email
	updateEmail (email) {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.currentUser.updateEmail(email)
				.then(success => resolve())
				.catch(error => {
					reject(error);
				})
		})
	}

	// Update password
	updatePassword (password) {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.currentUser.updatePassword(password)
				.then(success => resolve())
				.catch(error => {
					reject(error);
				})
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
				.catch(
					error => {
						reject(error);
					}
				)
		})
	}
}