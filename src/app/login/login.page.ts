import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private fb:FormBuilder, private navController:NavController,private afAuth:AngularFireAuth) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
   }

  ngOnInit() {
  }

  login(){
    const {email,password} = this.loginForm.value;
    this.afAuth.signInWithEmailAndPassword(email,password)
    .then(()=>{
      this.navController.navigateForward("/home")
    })
    .catch(error=>{
      console.log(error);
    })
  }
  goToSignup(){
    this.navController.navigateForward("/signup");
  }

}
