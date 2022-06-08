import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegisterComponent } from './components/register/register.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

//Rutas de navegacion
//Denis Rodriguez
//07/06/2022
const routes: Routes = [

  {
    pathMatch:'full',
    path:"",
    redirectTo:'Principal'
  },
  {
      path:"login",
      component: LoginComponent
  },
  {
    path:"register",
    component: RegisterComponent
  },
    {
    path:"Principal",
    component: PrincipalComponent
  },
  {
    path:"usuarios",
    component: UsuariosComponent
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
