using AutoMapper;
using webAPI.Data.Entities;
using webAPI.Data.Repositories;

namespace webAPI.Helpers
{
    public interface IUserService
    {
        User GetUserByCredentials(string email, string password);
    }

    public class UserService : IUserService
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IMapper _mapper;

        public UserService(IUsersRepository usersRepository, IMapper mapper)
        {
            _usersRepository = usersRepository;
            _mapper = mapper;
        }

        public User GetUserByCredentials(string email, string password)
        {
            var user = _usersRepository.Get(email, password).Result;
            if (user == null) return null;
            return user;
        }

    }
}
