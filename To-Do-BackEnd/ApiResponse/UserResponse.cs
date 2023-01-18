using System;
using To_Do_BackEnd.Models;

namespace To_Do_BackEnd.ApiResponse
{
    public class UserResponse 
    {
        public string Token { get; set; }

        public UserResponse(ViewUser user)
        {
        }
    }
}
