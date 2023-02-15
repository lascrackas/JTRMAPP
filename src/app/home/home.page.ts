import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userEmail:string="";
  constructor(private afAuth:AngularFireAuth,private navController:NavController) {

  }


  signout(){
    this.afAuth.signOut();
  }
  
  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log(user.uid);
        this.userEmail = user.email||"";
      } else {
        this.navController.navigateForward("/login");
      }
    });
  }
    
  }
