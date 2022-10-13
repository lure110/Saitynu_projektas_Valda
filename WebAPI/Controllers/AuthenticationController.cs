using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using webAPI.Data.Dtos.RefreshTokens;
using webAPI.Data.Dtos.Regions;
using webAPI.Data.Dtos.Users;
using webAPI.Data.Entities;
using webAPI.Data.Repositories;
using webAPI.Data.Requests;
using webAPI.Data.Responses;
using webAPI.Helpers.Authenticators;
using webAPI.Helpers.PasswordHashers;
using webAPI.Helpers.TokenGenerators;
using webAPI.Helpers.TokenGenerators.TokenValidators;

namespace webAPI.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IPasswordHasher _passwordHasher;
        private readonly IUsersRepository _usersRepository;
        private readonly IMapper _mapper;
        private readonly Authenticator _authenticator;
        private readonly RefreshTokenValidator _refreshTokenValidator;
        private readonly IRefreshTokensRepository _refreshTokensRepository;

        public AuthenticationController(IPasswordHasher passwordHasher, IUsersRepository usersRepository, IMapper mapper, 
             RefreshTokenValidator refreshTokenValidator, IRefreshTokensRepository refreshTokensRepository, Authenticator authenticator)
        {
            _passwordHasher = passwordHasher;
            _usersRepository = usersRepository;
            _mapper = mapper;
            _refreshTokenValidator = refreshTokenValidator;
            _refreshTokensRepository = refreshTokensRepository;
            _authenticator = authenticator;
        }

        [HttpPost("register")]

        public async Task<IActionResult> Register([FromBody] CreateUserDto user)
        {
            // need simple validation
            // check email, password 409 bad request


            string passwordHash = _passwordHasher.Hash(user.Password);
            User registrationUser = new User()
            {
                Email = user.Email,
                Name = user.Name,
                Password = passwordHash,
                Role = "Manager"
            };

            await _usersRepository.Create(registrationUser);

            return Ok(registrationUser);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin userEntry)
        {

            var user = await _usersRepository.Get(userEntry.Email);
            if (user == null) return Unauthorized();

            if(!_passwordHasher.Verify(userEntry.Password, user.Password))
            {
                return Unauthorized();
            }

            AuthenticatedUserResponse response = await _authenticator.Authenticate(user);

            return Ok(response);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequest refreshRequest)
        {

            if(!_refreshTokenValidator.Validate(refreshRequest.RefreshToken))
            {
                return BadRequest();
            }

            RefreshToken refreshTokenDto = await _refreshTokensRepository.GetByToken(refreshRequest.RefreshToken);
            if(refreshTokenDto == null) return NotFound();

            await _refreshTokensRepository.Delete(refreshTokenDto);

            var user = await _usersRepository.Get(refreshTokenDto.UserId);

            if (user == null) return NotFound();


            AuthenticatedUserResponse response = await _authenticator.Authenticate(user);

            return Ok(response);

        }

        
        [HttpDelete("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            string id = HttpContext.User.FindFirstValue("id");
            if (id == null) return NotFound();
            if(!int.TryParse(id, out int userId))
            {
                return Unauthorized();
            }

            await _refreshTokensRepository.DeleteAll(userId);

            return NoContent();
        }

        [HttpGet("tokens")]
        public async Task<IEnumerable<RefreshTokenDto>> GetAll()
        {
            return (await _refreshTokensRepository.GetAll()).Select(o => _mapper.Map<RefreshTokenDto>(o));
        }
    }
}
