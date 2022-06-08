using FBUsers.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Data;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FBUsers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AplicationDbContext _context; // el modificador readonly nos impide cambiar su valor
                                                       // su valor es inmutable una vez finalizada la propia declaración del campo     
        public UsersController(AplicationDbContext context)
        {

            _context = context; //DataContext “actúa como un proxy para la base de datos local”.
                                //Y poder manejar los datos como objetos
        }


        //=============================================================================
        // Author:		<Author,,Denis Rodriguez>
        //Create date: <Create 08/06/2022>
        // Description:	<Description, Mostrar listado de usuarios que hay en la DB >
        //=============================================================================
        [HttpGet]
        public async Task<ActionResult> Get() 
        {                                   //ToListAsync devuelve una tarea
            try
            {
                var listUsuarios = await _context.UsuariosModels.ToListAsync(); //El comando await antes de una promesa hace que espere hasta que la accion responda.
                return Ok(listUsuarios); //devuelve listadp
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); //Bad Request indica que el servidor no puede o no procesará la petición debido a algo que es percibido como un error del cliente
            }
        }

        //===========================================================================================================
        // Author:		<Author,,Denis Rodriguez>
        //Create date: <Create 08/06/2022>
        // Description:	<Description, Metodo con procedimiento almacenado para insertar usuarios que hay en la DB >
        //===========================================================================================================
        [HttpPost]
        public async Task<ActionResult<int>> Post([FromBody] UsuariosModel users)
        {
            var parametroId = new SqlParameter("@id", SqlDbType.Int);
            parametroId.Direction = ParameterDirection.Output;

            await _context.Database
                    .ExecuteSqlInterpolatedAsync($@"EXEC PA_InsertarUsuario_
                                                @id={parametroId} OUTPUT, @nombre={users.Nombre}, @Apellidos={users.Apellidos},
                                                @Usuario={users.Usuario}, @Clave={users.Clave}, @DireccionExacta={users.Direccion},
                                                @Telefono={users.Telefono}, @tipousuario={users.TipodeUsuario}");

            var id = (int)parametroId.Value;
            return Ok(users);

        }

        //===============================================================================
        // Author:		<Author,,Denis Rodriguez>
        //Create date: <Create 08/06/2022>
        // Description:	<Description, Metodo para actualizar usuarios que hay en la DB >
        //===============================================================================
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] UsuariosModel users)
        {
            try
            {
                if (id != users.Id) //si id es diferente al Id del usuario, devuelve un NotFound
                {
                    return NotFound();
                }
                _context.Update(users); // si es correcto, actualiza el usuario
                await _context.SaveChangesAsync(); // espera y guarda cambios
                return Ok(new { message = "El usuario fue actualizado con exito!" }); //si todo salio bien, mostrar mensaje positivo
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); //Bad Request indica que el servidor no puede o no procesará la petición debido a algo que es percibido como un error del cliente
            }
        }

        //===============================================================================
        // Author:		<Author,,Denis Rodriguez>
        //Create date: <Create 08/06/2022>
        // Description:	<Description, Metodo para eliminar usuarios que hay en la DB >
        //===============================================================================
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var usuarios = await _context.UsuariosModels.FindAsync(id);

                if (usuarios == null) //Si usuario es igual a nulo, devuelve not found
                {
                    return NotFound();
                }
                _context.UsuariosModels.Remove(usuarios); //remover usuario de la BD
                await _context.SaveChangesAsync(); //Espera y guarda cambios
                return Ok(new { message = "El usuario fue eliminado con exito!" }); //si todo salio bien mostrar mensaje al usuario
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
