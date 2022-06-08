import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService { //de tipo privadas para que los componentes no la puedan ver

  //URLS para conectar El Backend con Angular
  //Denis Rodriguez
  //07/06/2022
 private myAppUrl = 'https://localhost:44343/'; //URL de la app que fue creada en NET Core.
 private myApiUrl = 'api/users/'; //para acceder al controlador del Back-end, en este caso se llama Tarjeta

  constructor(private http: HttpClient) {}

  //Metodo para mostrar listado de los usuarios
  //Denis Rodriguez
  //07/06/2022
  getListUsuario(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
   }

  //Metodo para eliminar usuario de la bd
  //Denis Rodriguez
  //07/06/2022
   deleteUsuario(id: number):Observable<any>{
     return this.http.delete(this.myAppUrl + this.myApiUrl + id);
   }

  //Metodo para agregar y guardar un nuevo usuario en la base de datos
  //Denis Rodriguez
  //07/06/2022
   saveUsuario(users:any): Observable<any>{
     return this.http.post(this.myAppUrl + this.myApiUrl, users);
   }


  //Metodo para actualizar un usuario
  //Denis Rodriguez
  //07/06/2022
   updateUsuario(id:number, users: any): Observable<any>{
     return this.http.put(this.myAppUrl + this.myApiUrl + id, users);
   }
}
 //Un observable puede ser creado a partir de eventos de usuario derivados del uso de un formulario, una llamada HTTP,
 //un almacén de datos, etc.
 //Mediante el observable nos podemos suscribir a eventos que nos permiten hacer cosas cuando cambia lo que se esté observando.
 //Observer: Es el actor que se dedica a observar.
