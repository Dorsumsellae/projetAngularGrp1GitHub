import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  formSignin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  createAccount() {
    const email = this.formSignin.value.email;
    const password = this.formSignin.value.password;
    console.log(email, password);

    this.auth.createUserWithEmailAndPassword(email, password).then((user) => {
      console.log('user', user);
      this._router.navigate(['home']);
    });
  }

  constructor(private _router: Router, private auth: AngularFireAuth) {}

  ngOnInit(): void {}
}
