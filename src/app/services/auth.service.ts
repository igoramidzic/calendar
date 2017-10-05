import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService implements OnInit {

	ngOnInit() {
		
	}

	constructor(public afAuth: AngularFireAuth, private afdb: AngularFireDatabase) { }

	// Signup | Email
	signupUserWithEmail (first: string, last: string, email: string, password: string) {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.createUserWithEmailAndPassword(email, password)
				.then(
					success => {
						this.afAuth.auth.currentUser.updateProfile({
							displayName: `${first} ${last}`,
							photoURL: ''
						})
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
	}
}