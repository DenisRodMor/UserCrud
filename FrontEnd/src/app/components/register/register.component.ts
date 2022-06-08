import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuario={
    email: '',
    password:''
    }

    constructor(private authService: AuthService){

    }


  //Metodo para registrarse en el sistema
  //Denis Rodriguez
  //07/06/2022
    registrarse(){
      console.log(this.usuario);
      const {email,password}=this.usuario;
      this.authService.register(email, password).then(res => {
        console.log("se registró: ", res);
      })
    }


  ngOnInit(): void {
  }

}
