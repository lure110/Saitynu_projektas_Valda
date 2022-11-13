using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using System.Collections.Specialized;
using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using webAPI.Data.Dtos.RefreshTokens;
using webAPI.Data.Dtos.Regions;
using webAPI.Data.Dtos.Users;
using webAPI.Data.Entities;
using webAPI.Data.Repositories;
using webAPI.Data.Requests;
using webAPI.Data.Responses;
using webAPI.Helpers;
using webAPI.Helpers.Authenticators;
using webAPI.Helpers.PasswordHashers;
using webAPI.Helpers.TokenGenerators;
using webAPI.Helpers.TokenGenerators.TokenValidators;
using CookieHeaderValue = System.Net.Http.Headers.CookieHeaderValue;
using System.Web;


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
        private readonly AuthenticationConfiguration _authenticationConfiguration;

        public AuthenticationController(IPasswordHasher passwordHasher, IUsersRepository usersRepository, IMapper mapper, 
             RefreshTokenValidator refreshTokenValidator, IRefreshTokensRepository refreshTokensRepository, 
             Authenticator authenticator, IOptions<AuthenticationConfiguration> configuration)
        {
            _passwordHasher = passwordHasher;
            _usersRepository = usersRepository;
            _mapper = mapper;
            _refreshTokenValidator = refreshTokenValidator;
            _refreshTokensRepository = refreshTokensRepository;
            _authenticator = authenticator;
            _authenticationConfiguration = configuration.Value;
        }

        [HttpPost("register")]

        public async Task<IActionResult> Register([FromBody] CreateUserDto user)
        {
            // need simple validation
            // check email, password 409 bad request

            if(await _usersRepository.Get(user.Email) != null)
            {
                return Conflict(new ErrorResponse()
                {
                    ErrorMessage = "User already exists"
                });
            }

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

        [EnableCors]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin userEntry)
        {
            var user = await _usersRepository.Get(userEntry.Email);
            if (user == null) return NotFound();
            try
            {
                if (!_passwordHasher.Verify(userEntry.Password, user.Password))
                {
                    return Unauthorized();
                }
            }
            catch(Exception)
            {
                return BadRequest();
            }


            AuthenticatedUserResponse response = await _authenticator.Authenticate(user);
            
            CookieOptions opt = new CookieOptions();
            opt.Expires = DateTimeOffset.Now.AddMinutes(_authenticationConfiguration.ExpirationTimeInMinutes);
            opt.Domain = "localhost";
            opt.Path = "/";

            CookieOptions opt1 = new CookieOptions();
            opt1.Expires = (DateTime.Now.AddMinutes(_authenticationConfiguration.RefreshExpirationTimeInMinutes));
            opt1.Domain = "localhost";
            opt1.Path = "/";

            Response.Cookies.Append("access_token", response.AccessToken, opt);
            Response.Cookies.Append("refresh_token", response.RefreshToken, opt1);

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
