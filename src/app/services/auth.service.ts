import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService implements OnInit {

	ngOnInit() {

	}

	constructor(public afAuth: AngularFireAuth) { }

	// Signup | Email
	signupUserWithEmail (email: string, password: string) {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.createUserWithEmailAndPassword(email, password)
				.then(
					success => {
						resolve(success);
					}
				).catch(
					error => {
						reject(error);
					}
				)
		});
	}

	// Login | Email
	loginUserWithEmail (email: string, password: string) {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.signInWithEmailAndPassword(email, password)
				.then(
					success => {
						resolve(success);
					}
				).catch(
					error => {
						reject(error);
					}
				)
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
				.then(
					success => {
						resolve(success);
					}
				).catch(
					error => {
						reject(error);
					}
				)
		})
	}

	// Signup/Login | Facebook
	loginUserWithFacebook () {
		// Return as promise instead of callback
		return new Promise((resolve, reject) => {
			this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
				.then(
					success => {
						resolve(success);
					}
				).catch(
					error => {
						reject(error);
					}
				)
		})
		
	}

	// Logout
	logoutUser () {
		this.afAuth.auth.signOut();
	}
}
