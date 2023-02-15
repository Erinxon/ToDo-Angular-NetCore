using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using To_Do_BackEnd.Models;
using To_Do_BackEnd.Tools;

namespace To_Do_BackEnd.Services
{
    public interface ITodoServices
    {
        Task<IEnumerable<ViewTodo>> GetTasks(Guid UserId, int pageNumber, int pageSize, int type);
        Task AddTask(ToDo toDo);
        Task UpdateTask(ToDo toDo);
        Task DeleteTask(Guid id);
        Task<int> GetCount(Guid UserId);
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
            var todos = await this.toDoDbContext.ViewTodos.FromSqlRaw($"{ProcedureNames.Sp_GetToDo} '{UserId}',{pageNumber},{pageSize},{type}").ToListAsync();
            return todos.AsEnumerable();
        }

        public async Task AddTask(ToDo toDo)
        {
            await this.toDoDbContext.Database.ExecuteSqlInterpolatedAsync($"{ProcedureNames.Sp_SetToDo} {toDo.ToDoId}, {toDo.Name}, {toDo.Description}, {toDo.Done}, {toDo.UserId}, {Operation.Insert}");
        }

        public async Task UpdateTask(ToDo toDo)
        {
            await this.toDoDbContext.Database.ExecuteSqlInterpolatedAsync($"{ProcedureNames.Sp_SetToDo} {toDo.ToDoId}, {toDo.Name}, {toDo.Description}, {toDo.Done}, {toDo.UserId}, {Operation.Update}");
        }

        public async Task DeleteTask(Guid id)
        {
            await this.toDoDbContext.Database.ExecuteSqlInterpolatedAsync($"{ProcedureNames.Sp_SetToDo} {id}, null, null, null, null, {Operation.Delete}");
        }

        public async Task<int> GetCount(Guid UserId)
        {
            var count = await this.toDoDbContext.ViewGetTotalRecords.FromSqlRaw($"{ProcedureNames.Sp_GetTotalRecords} '{UserId}'").ToListAsync();
            return count.Count() > 0 ? (int) count?.SingleOrDefault()?.Total : 0;
            
        }
    }
}
