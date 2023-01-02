using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using To_Do_BackEnd.Models;

namespace To_Do_BackEnd.Services
{
    public interface ITodoServices
    {
        Task<IEnumerable<ViewTodo>> GetTasks(Guid UserId, int pageNumber, int pageSize, int type);
        Task<Guid> AddTask(ToDo toDo);
    }

    public class TodoServices : ITodoServices
    {
        private readonly ToDoDbContext toDoDbContext;

        public TodoServices(ToDoDbContext toDoDbContext)
        {
            this.toDoDbContext = toDoDbContext;
        }

        public async Task<IEnumerable<ViewTodo>> GetTasks(Guid UserId, int pageNumber, int pageSize, int type)
        {
            return await this.toDoDbContext.ViewTodos.FromSqlRaw($"Sp_GetToDo '{UserId}',{pageNumber},{pageSize},{type}").ToListAsync();
        }

        public async Task<Guid> AddTask(ToDo toDo)
        {
            await this.toDoDbContext.ToDos.AddAsync(toDo);
            await this.toDoDbContext.SaveChangesAsync();
            return toDo.ToDoId;
        }

    }
}
