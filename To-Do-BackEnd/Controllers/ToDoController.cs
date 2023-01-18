using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
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
        public async Task<ActionResult<ApiResponse<IEnumerable<ViewTodo>>>> Get(Guid UserId, int pageNumber, int pageSize, int type = 0)
        {
            var response = new ApiResponse<IEnumerable<ViewTodo>>();
            try
            {
                var tasks = await this.todoServices.GetTasks(UserId, pageNumber, pageSize, type);
                response.Data = tasks;
                response.Pagination.Total = await this.todoServices.GetCount(UserId);
                response.Pagination.Size= pageSize;
                response.Pagination.Page = pageNumber;
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
                if (setTodoDto.ToDoId is null)
                {
                    await this.todoServices.AddTask(task);
                }
                else
                {
                    await this.todoServices.UpdateTask(task);
                }
            }
            catch (Exception ex)
            {
                response.Succeed = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpDelete]
        public async Task<ActionResult<ApiResponse<Guid>>> Delete(Guid Id)
        {
            var response = new ApiResponse<Guid>();
            try
            {
                await this.todoServices.DeleteTask(Id);
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
