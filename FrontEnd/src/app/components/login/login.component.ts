import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
        //=============================================================================
        // Author:		<Author,,Denis Rodriguez>
        //Create date: <Create 13/06/2022>
        // Description:	<Description, variables para el login   >
        //=============================================================================
  usuario={
    email: '',
    password:''
    }

    constructor(private authService: AuthService){

    }

        //=============================================================================
        // Author:		<Author,,Denis Rodriguez>
        //Create date: <Create 13/06/2022>
        // Description:	<Description, Metodo para iniciar sesion con correo y pass   >
        //=============================================================================
    Ingresar(){
      console.log(this.usuario);
      const {email,password}=this.usuario;
      this.authService.login(email, password).then(res => {
        console.log("se registró: ", res);
      })
    }


        //=============================================================================
        // Author:		<Author,,Denis Rodriguez>
        //Create date: <Create 13/06/2022>
        // Description:	<Description, Metodo para iniciar sesion con cuenta de google >
        //=============================================================================

    IngresarConGoogle(){
          console.log(this.usuario);
      const {email,password}=this.usuario;
      this.authService.loginWithGoogle(email, password).then(res => {
        console.log("se registró: ", res);
      })
    }

        //=============================================================================
        // Author:		<Author,,Denis Rodriguez>
        //Create date: <Create 13/06/2022>
        // Description:	<Description, Metodo para cerrar sesion   >
        //=============================================================================

    logout(){
      this.authService.logout();
    }


  ngOnInit(): void {
  }

}
