import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;

  ngOnInit() {
  }

  constructor(private fb: FormBuilder,private navController:NavController, private afAuth: AngularFireAuth,private functions:AngularFireFunctions) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  call(){
    const { email, password, lastName, firstName, phoneNumber } = this.signupForm.value;
    const createUsr = this.functions.httpsCallable("createUsr");
    createUsr({email:email,firstName:firstName,lastName:lastName,password:password,phone:phoneNumber})
    .subscribe((data)=>{
      if(!data.errorInfo){
        this.afAuth.signInWithEmailAndPassword(email,password)
        .then(()=>{
          this.navController.navigateForward("/home");

        })
        .catch((error)=>console.log(error))
      }
    });
  }

  goToLogin(){
    this.navController.navigateForward("/login");
  }

}
