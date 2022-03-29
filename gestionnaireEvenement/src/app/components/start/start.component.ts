import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  formlogin = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required]),
  });

  signIn() {
    this._router.navigate(['/signin']);
  }

  loginEmail() {
    const { email, password } = this.formlogin.value;
    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      this._router.navigate(['home']);
    });
  }

  loginGoogle() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => this._router.navigate(['/home']));
  }
  logout() {
    this.auth.signOut();
    this._router.navigate(['/']);
  }

  constructor(public auth: AngularFireAuth, private _router: Router) {}

  ngOnInit(): void {}
}
