import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  authState: firebase.User = null;
  loggedIn: boolean = false;

  constructor(private afAuth: AngularFireAuth) { }

  get getAuthState$():Observable<firebase.User>{
    return this.afAuth.authState;
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  set setAuthState(authState:firebase.User){
    this.authState = authState;
  }

  get getAuthState():firebase.User{
    return this.authState;
  }

  logout() {
    this.afAuth.auth.signOut().then(()=>{
      window.location.reload();
    });
  }

  doGoogleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');    
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }

  doRegister(value){
    return firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: value.displayName,
          photoURL: ""
        });
      });
  }

  doLogin(value){
    return firebase.auth().signInWithEmailAndPassword(value.email, value.password);
  } 
}
