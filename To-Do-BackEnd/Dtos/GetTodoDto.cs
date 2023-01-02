using System;
using To_Do_BackEnd.Models;

namespace To_Do_BackEnd.Dtos
{
    public class GetTodoDto
    {
        public Guid ToDoId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Done { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreateDate { get; set; }
        public User User { get; set; }
    }
}
