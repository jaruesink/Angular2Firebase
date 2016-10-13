import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  user: any = {};
  isLoggingIn: boolean = true;
  constructor(public af: AngularFire, private router: Router) {
    this.af.auth.subscribe(data => {
      console.log('auth return data: ', data);
      if ( data ) {
        this.user.name = data.auth.displayName;
        this.user.email = data.auth.email;
        this.user.photo = data.auth.photoURL;
        this.user.uid = data.uid;
        console.log('user data:', this.user);
        this.compareUserData();
        this.router.navigate(['/']);
      } else {
        this.isLoggingIn = false;
        this.router.navigate(['/login']);
      }
    });
  }
  facebookLogin() {
    console.log('signing in with facebook');
    this.af.auth.login().then(() => {
      console.log('you are logging in');
      this.isLoggingIn = true;
    });
  }
  compareUserData() {
    const user$ = this.af.database.object('/users/'+this.user.uid);
    user$.subscribe( fbdata => {
      if ( this.user.name !== fbdata.name ) {
        user$.update({name: this.user.name});
      }
      if ( this.user.email !== fbdata.email ) {
        user$.update({email: this.user.email});
      }
      if ( this.user.photo !== fbdata.photo ) {
        user$.update({photo: this.user.photo});
      }
    }, console.error );
  }
  signout() {
    console.log('signing out');
    this.af.auth.logout();
    this.router.navigate(['/login']);
  }
}
