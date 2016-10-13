import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule, Components } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

const firebaseConfig = {
  apiKey: "AIzaSyBOlWSvPeZuM-U5Zc6SbIu4bS-NbNNhvJc",
  authDomain: "fir-app-8f3ba.firebaseapp.com",
  databaseURL: "https://fir-app-8f3ba.firebaseio.com",
  storageBucket: "fir-app-8f3ba.appspot.com",
  messagingSenderId: "696806146392"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Facebook,
  method: AuthMethods.Redirect
}

@NgModule({
  declarations: [
    ...Components
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [ AuthService, ChatService ],
  bootstrap: [ Components[0] ]
})
export class AppModule { }
