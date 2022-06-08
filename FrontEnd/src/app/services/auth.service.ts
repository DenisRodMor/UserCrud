import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth) { }

  //Metodo para registrarse con email y contraseña
  //Denis Rodriguez
  //07/06/2022
  async register(email:string, password:string){
    try{
      return await this.afauth.createUserWithEmailAndPassword(email, password);

    }catch (err) {
      console.log("error en login: ", err);
      return null;
    }
  }

  //Metodo para iniciar sesion con email y contraseña
  //Denis Rodriguez
  //07/06/2022
  async login(email:string, password:string){
    try{
      return await this.afauth.signInWithEmailAndPassword(email, password);

    }catch (err) {
      console.log("error en login: ", err);
      return null;
    }
  }

  //Metodo para iniciar sesion con cuenta de google
  //Denis Rodriguez
  //07/06/2022
  async loginWithGoogle(email:string, password:string){
    try{
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    }catch (err) {
      console.log("error en login con google: ", err);
      return null;
    }
  }

  //Metodo para mostrar cual es el usuario que se encuentra logeado
  //Denis Rodriguez
  //07/06/2022
  getUserLogged(){
    return this.afauth.authState;
  }

  //Metodo para cerrar sesion
  //Denis Rodriguez
  //07/06/2022
  logout(){
    this.afauth.signOut();
  }
}
