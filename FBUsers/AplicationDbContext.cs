using FBUsers.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FBUsers
{
    public class AplicationDbContext : DbContext
    {
        public DbSet<UsuariosModel> UsuariosModels { get; set; }

        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {

        }
    }
}
