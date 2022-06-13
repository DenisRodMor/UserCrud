import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {


  listarUsuario : any[] = []; //array para guardar las tarjetas
  accion= 'Agregar'; //variable a utilizar para que cambie el titulo dependiendo de la accion

  form: FormGroup; //variable a utilizar para el formulario
  id: number | undefined;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private _UsuarioService: UsuarioService) {
    this.form = this.fb.group({ //validaciones que tendran los campos del formulario de tarjeta
      nombre:['', Validators.required],
      apellidos:['', Validators.required],
      usuario:['', Validators.required],
      clave:['',Validators.required],
      direccion:['',Validators.required],
      telefono:['',[Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      tipodeUsuario:['']
    })
   }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  //Metodo para obtener listado de usuarios de la BD
  //Denis Rodriguez
  //07/06/2022
  obtenerUsuarios(){
    this._UsuarioService.getListUsuario().subscribe(data =>{ //Subscribe() es un método en Angular que conecta el observer con eventos observable . Siempre que se realiza algún cambio en estos observables, se ejecuta un código y observa los resultados o cambios mediante el método subscribe.
      console.log(data);    //traer los datos desde la API, para eso sirve el data
      this.listarUsuario = data ; //traer los datos desde la BD y la API
    }, error => {
      console.log(error); //si hubo algun error, muestra mensaje de que algo sucedio
    });

  }


        //=============================================================================
        // Author:		<Author,,Denis Rodriguez>
        //Create date: <Create 13/06/2022>
        // Description:	<Description, Metodo para guardar usuario en la base de datos>
        //=============================================================================
  guardarUsuario(){
          const usuario: any = { //los datos ingresados en el formulario, guardarlos en su variable
            nombre:this.form.get('nombre')?.value,
            apellidos:this.form.get('apellidos')?.value,
            usuario:this.form.get('usuario')?.value,
            clave:this.form.get('clave')?.value,
            direccion:this.form.get('direccion')?.value,
            telefono:this.form.get('telefono')?.value,
            tipodeUsuario:this.form.get('tipodeUsuario')?.value
          }

          if(this.id == undefined){
            //Agregamos una tarjeta
            this._UsuarioService.saveUsuario(usuario).subscribe(data => { //Subscribe() es un método en Angular que conecta el observer con eventos observable . Siempre que se realiza algún cambio en estos observables, se ejecuta un código y observa los resultados o cambios mediante el método subscribe.
              this.toastr.success('El usuario fue registrado con éxito!', 'Usuario Registrada!'); //mostrar notificaciones de estado al usuario.
              this.obtenerUsuarios(); //llama al listado de usuarios luego de agregar
              this.form.reset(); //resetear formulario al agregar el usuario
            },error => {
              this.toastr.info('Recargue la pagina para observar el cambio!', 'Recargue!'); //mostrar notificaciones de estado al usuario.
              console.log(error);
            });
          }else{
            //Editamos una tarjeta
            usuario.id = this.id;

            this._UsuarioService.updateUsuario(this.id,usuario).subscribe(data =>{ //Subscribe() es un método en Angular que conecta el observer con eventos observable . Siempre que se realiza algún cambio en estos observables, se ejecuta un código y observa los resultados o cambios mediante el método subscribe.
              this.form.reset(); //resetear formulario al actualizar el usuario
              this.accion = 'Agregar'; //accion que va utilizar el titulo para cambiar de estado
              this.id=undefined;
              this.toastr.info('El usuario fue actualizado con exito', 'Usuario Actualizado');//mostrar notificaciones de estado al usuario.
              this.obtenerUsuarios(); //llama al listado de los usuarios luego de actualizar
            }, error => {
              console.log(error); //si hubo algun error, muestra mensaje de que algo sucedio
            })
          }
  }

  //Metodo para eliminar usuario de la bd
  //Denis Rodriguez
  //07/06/2022
  eliminarUsuario(id: number){
    this._UsuarioService.deleteUsuario(id).subscribe(data => { //eliminar una tarjeta en especifico //Subscribe() es un método en Angular que conecta el observer con eventos observable . Siempre que se realiza algún cambio en estos observables, se ejecuta un código y observa los resultados o cambios mediante el método subscribe.
      this.toastr.error('El usuario fue eliminado correctamente!', 'Eliminado!'); //mostrar notificaciones de estado al usuario.
      this.obtenerUsuarios(); //llama al listado de los usuarios luego de eliminar
    }, error => {
      console.log(error); //si hubo algun error, muestra mensaje de que algo sucedio
    });
  }


  //Metodo para editar usuario de la bd
  //Denis Rodriguez
  //07/06/2022
  editarUsuario(usuario: any){
    this.accion = 'Editar'; //accion que va utilizar el titulo para cambiar de estado
    this.id = usuario.id;

    this.form.patchValue({
      nombre: usuario.nombre, //modificar y guardar los cambios que se realicen en lo ingresado en cada variable
      apellidos: usuario.apellidos,
      usuario: usuario.usuario,
      clave: usuario.clave,
      direccion: usuario.direccion,
      telefono: usuario.telefono,
      tipodeUsuario: usuario.tipodeUsuario
    })

  }



}
