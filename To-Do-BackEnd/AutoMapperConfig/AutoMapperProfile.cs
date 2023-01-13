using AutoMapper;
using To_Do_BackEnd.Dtos;
using To_Do_BackEnd.Models;

namespace To_Do_BackEnd.AutoMapperConfig
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ToDo, SetTodoDto>();
            CreateMap<SetTodoDto, ToDo>();
            CreateMap<UserDto, User>();
            CreateMap<User, UserDto>();
        }
    }
}
