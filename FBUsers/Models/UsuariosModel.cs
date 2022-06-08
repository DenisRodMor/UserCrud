using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FBUsers.Models
{
    public class UsuariosModel
    {
        //===============================================================================
        // Author:		<Author,,Denis Rodriguez>
        //Create date: <Create 08/06/2022>
        // Description:	<Description, Propiedades que tendrá la BD >
        //===============================================================================
        public int Id { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        public string Apellidos { get; set; }

        [Required]
        public string Usuario { get; set; }

        [Required]
        public string Clave { get; set; }

        [Required]
        public string Direccion { get; set; }

        [Required]
        public string Telefono { get; set; }

        [Required]
        public string TipodeUsuario { get; set; }
    }
}
