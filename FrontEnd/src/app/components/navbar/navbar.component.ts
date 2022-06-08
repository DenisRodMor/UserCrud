import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  userLogged=this.authService.getUserLogged();

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }


  //Metodo para cerrar sesion en el sistema
  //Denis Rodriguez
  //07/06/2022
  logout(){
    this.authService.logout();
  }

}
