using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using To_Do_BackEnd.ApiResponse;
using To_Do_BackEnd.Dtos;
using To_Do_BackEnd.Models;
using To_Do_BackEnd.Services;

namespace To_Do_BackEnd.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ToDoController : ControllerBase
    {
        private readonly ITodoServices todoServices;
        private readonly IMapper mapper;

        public ToDoController(ITodoServices todoServices, IMapper mapper)
        {
            this.todoServices = todoServices;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<ViewTodo>>>> Get(Guid UserId, int pageNumber = 1, int pageSize = 1000, int type = 0)
        {
            var response = new ApiResponse<IEnumerable<ViewTodo>>();
            try
            {
                var tasks = await this.todoServices.GetTasks(UserId, pageNumber, pageSize, type);
                response.Data = tasks;
            }
            catch (Exception ex)
            {
                response.Succeed = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<Guid>>> Post([FromBody] SetTodoDto setTodoDto)
        {
            var response = new ApiResponse<Guid>();
            try
            {
                var task = this.mapper.Map<ToDo>(setTodoDto);
                task.ToDoId = Guid.NewGuid();
                response.Data = await this.todoServices.AddTask(task);
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
