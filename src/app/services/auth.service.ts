import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: firebase.User = null;
  loggedIn: boolean = null;

  constructor(private afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe((auth) => {
      if(auth){
        this.authState = auth;
        this.loggedIn = true;
  	  }
  	  else{
  	  	this.loggedIn = false;
  	  }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
  
  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
  	  let provider = new firebase.auth.GoogleAuthProvider();
  	  provider.addScope('profile');
  	  provider.addScope('email');
  	  this.afAuth.auth.signInWithPopup(provider).then(res => {
  	    resolve(res);
  	  })
	  })
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: value.displayName,
          photoURL: ""
        }).then(function() {
        }).catch(function(error) {
        });
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  } 
}
