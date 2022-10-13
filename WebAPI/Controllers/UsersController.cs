﻿using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using webAPI.Data.Dtos.Users;
using webAPI.Data.Entities;
using webAPI.Data.Repositories;

namespace webAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IMapper _mapper;
        public UsersController(IUsersRepository usersRepository, IMapper mapper)
        {
            _usersRepository = usersRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IEnumerable<UserDto>> GetAll()
        {
            return (await _usersRepository.GetAll()).Select(o => _mapper.Map<UserDto>(o));
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Manager, Administrator")]
        public async Task<ActionResult<User>> Get(int id)
        {
            var user = await _usersRepository.Get(id);
            if (user == null) return NotFound();
            return Ok(_mapper.Map<UserDto>(user));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<ActionResult<UserDto>> Post(CreateUserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);

            await _usersRepository.Create(user);
            // 201 sukurta
            return Created($"/api/users/{user.Id}", _mapper.Map<UserDto>(user));
        }

        [HttpPatch("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Manager, Administrator")]
        public async Task<ActionResult<UserDto>> Put(int id, UpdateUserDto userDto)
        {
            var user = await _usersRepository.Get(id);
            if (user == null) return NotFound();

            //region.Description = regionDto.Description;
            _mapper.Map(userDto, user);


            await _usersRepository.Put(user);
            return Ok(_mapper.Map<UserDto>(user));
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<ActionResult<UserDto>> Delete(int id)
        {
            var user = await _usersRepository.Get(id);
            if (user == null) return NotFound();

            await _usersRepository.Delete(user);
            // 204
            return NoContent();
        }
    }
}