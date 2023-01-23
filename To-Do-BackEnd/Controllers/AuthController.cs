using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using To_Do_BackEnd.ApiResponse;
using To_Do_BackEnd.Dtos;
using To_Do_BackEnd.Models;
using To_Do_BackEnd.Services;
using To_Do_BackEnd.Tools;

namespace To_Do_BackEnd.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthServices authServices;
        private readonly IConfiguration configuration;
        private readonly IMapper mapper;

        public AuthController(IAuthServices authServices, IConfiguration configuration, IMapper mapper)
        {
            this.authServices = authServices;
            this.configuration = configuration;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<UserResponse>>> Post([FromBody] AuthDto model)
        {
            var response = new ApiResponse<UserResponse>();
            try
            {
                model.Password = model.Password.EncryptedPassword();
                var user = await this.authServices.Login(model.Email, model.Password);
                if (user is null)
                {
                    response.Message = "Usuario o Contraseña Incorrecta";
                    return Unauthorized(response);
                }
                DateTime expires = user.TypeUser == (int) TypeUser.Registered ? DateTime.UtcNow.AddMinutes(1) : DateTime.UtcNow.AddMinutes(2);
                var userResponse = new UserResponse(user)
                {
                    Token = GenerateJWT.Generate(user, this.configuration, expires)
                };
                response.Data = userResponse;
            }
            catch (Exception ex)
            {
                response.Succeed = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("Create")]
        public async Task<ActionResult<ApiResponse<Guid>>> Create([FromBody] UserDto userDto)
        {
            var response = new ApiResponse<Guid>();
            try
            {
                var user = this.mapper.Map<User>(userDto);
                user.Password = user.Password.EncryptedPassword();
                response.Data = await this.authServices.Create(user);
            }
            catch (Exception ex)
            {
                response.Succeed = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpGet("GenerateGuestUsers")]
        public ActionResult<ApiResponse<GuestUserDto>> GenerateGuestUsers()
        {
            var response = new ApiResponse<GuestUserDto>();
            try
            {
                var guid = Guid.NewGuid().ToString().Split('-')[0];
                var user = new GuestUserDto
                {
                    FirstName = $"Guest{guid}",
                    LastName = guid,
                    Email = $"guest{guid}@guest.com",
                    TypeUser = (int) TypeUser.Guest,
                    Password = "123456"
                };
                response.Data = user;
            }
            catch (Exception ex)
            {
                response.Succeed = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }
            return Ok(response);
        }

        
    }
}
