using System;

namespace To_Do_BackEnd.Dtos
{
    public class SetTodoDto
    {
        public Guid ToDoId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid UserId { get; set; }
    }
}
