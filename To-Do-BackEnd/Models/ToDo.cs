using System;
using System.Collections.Generic;

#nullable disable

namespace To_Do_BackEnd.Models
{
    public partial class ToDo
    {
        public Guid ToDoId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Done { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreateDate { get; set; }

        public virtual User User { get; set; }
    }
}
