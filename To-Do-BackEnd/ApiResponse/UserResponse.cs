using System;
using To_Do_BackEnd.Models;

namespace To_Do_BackEnd.ApiResponse
{
    public class UserResponse 
    {
        /*public Guid UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int TypeUser { get; set; }
        public string Email { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }*/
        public string Token { get; set; }

        public UserResponse(ViewUser user)
        {
            /*this.UserId = user.UserId;
            this.FirstName = user.FirstName;
            this.LastName = user.LastName;
            this.TypeUser = user.TypeUser;
            this.Status = user.Status;
            this.Email = user.Email;
            this.CreateDate = user.CreateDate;*/
        }
    }
}
