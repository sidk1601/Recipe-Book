import * as firebase from 'firebase';
import { Router } from '@angular/router';

export class AuthService {
    token: string;

    constructor(private router: Router) {}

    signup(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(err => {
                console.log(err);
            });
    }

    signIn(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                firebase.auth().currentUser.getIdToken()
                    .then(token => {
                        this.token = token;
                    });
            })
            .catch(err => {
                console.log(err);
            })
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
        .then(token => {
            this.token = token;
        });
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }
}