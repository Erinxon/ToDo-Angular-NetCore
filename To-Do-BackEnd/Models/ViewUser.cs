using System;
using System.Collections.Generic;

#nullable disable

namespace To_Do_BackEnd.Models
{
    public partial class ViewUser
    {
        public Guid UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int TypeUser { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
    }
}
