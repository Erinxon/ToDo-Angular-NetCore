using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using To_Do_BackEnd.Models;

namespace To_Do_BackEnd.Services
{
    public interface IAuthServices
    {
        Task<ViewUser> Login(string Email, string Password);
        Task<Guid> Create(User user);
    }
    public class AuthServices : IAuthServices
    {
        private readonly ToDoDbContext toDoDbContext;

        public AuthServices(ToDoDbContext toDoDbContext)
        {
            this.toDoDbContext = toDoDbContext;
        }

        public async Task<ViewUser> Login(string Email, string Password)
        {
            var user = await this.toDoDbContext.ViewUsers.FromSqlRaw($"Sp_Login '{Email}','{Password}'").ToListAsync();
            return user.FirstOrDefault();
        }

        public async Task<Guid> Create(User user)
        {
            await this.toDoDbContext.Users.AddAsync(user);
            await this.toDoDbContext.SaveChangesAsync();
            return user.UserId;
        }
    }
}
