using Microsoft.EntityFrameworkCore.Migrations;

namespace FBUsers.Migrations
{
    public partial class ProcedimientosAlmacenados : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"Create procedure [dbo].[PA_InsertarUsuario_]
                        @id int OUTPUT,
                        @nombre nvarchar(max),
                        @Apellidos nvarchar(max),
                        @Usuario nvarchar(max),
                        @Clave nvarchar(max),
                        @DireccionExacta nvarchar(max),
                        @Telefono nvarchar (max),
                        @tipousuario nvarchar(max)
                        as 
                        begin
                        set @Clave=(ENCRYPTBYPASSPHRASE( 'Encriptacion',@Clave));

                        insert into UsuariosModels values (@nombre, @Apellidos, @Usuario, @Clave, @DireccionExacta, @Telefono, @tipousuario)
                        end");

            migrationBuilder.Sql(@"Create procedure [dbo].[PA_EditarUsuario]
                                    @idUsuario int,
                                    @Rol int,
                                    @nombre nchar(50),
                                    @Apellido1 nchar(50),
                                    @Apellido2 nchar(50),
                                    @Usuario nchar(50),
                                    @Clave nvarchar(MAX),
                                    @DireccionExacta nchar(50),
                                    @Telefono int
                                    as 
                                    begin
                                    set @Clave=(ENCRYPTBYPASSPHRASE( 'Encriptacion',@Clave));

                                    update  Usuarios set TipoUsuario= @Rol, 
					                                    Nombres=	@nombre, 
					                                    ApellidoPaterno=@Apellido1, 
					                                    ApellidoMaterno=@Apellido2,
					                                    Usuario=@Usuario, 
					                                    Clave=@Clave, 
					                                    DireccionExacta=@DireccionExacta, 
					                                    Telefono=@Telefono
		                                    where idUsuario =@idUsuario
                                    end");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP procedure [dbo].[PA_EditarUsuario]");
            migrationBuilder.Sql("DROP procedure [dbo].[PA_InsertarUsuario_]");
        }
    }
}
