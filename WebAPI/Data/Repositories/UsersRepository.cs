using Microsoft.EntityFrameworkCore;
using webAPI.Data.Entities;

namespace webAPI.Data.Repositories
{
    public interface IUsersRepository
    {
        Task<User> Create(User user);
        Task Delete(User user);
        Task<User> Get(int id);
        Task<User> Get(string email, string password);
        Task<IEnumerable<User>> GetAll();
        Task<User> Put(User user);
    }

    public class UsersRepository : IUsersRepository
    {
        private readonly RestContext _restContext;

        public static List<User> Users = new()
        {
            new () { Email = "test@test.com", Password =  "password", Name = "Arnas A", Role = "Administrator"},
            new () { Email = "test1@test.com", Password =  "password", Name = "Arnas A", Role = "Manager"},
        };


        public UsersRepository(RestContext restContext)
        {
            _restContext = restContext;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _restContext.Users.ToListAsync();
        }

        public async Task<User> Get(string email, string password)
        {
            return await _restContext.Users.FirstOrDefaultAsync(o => o.Email.Equals(email) && o.Password.Equals(password));

            var user = await _restContext.Users.FirstOrDefaultAsync(o => o.Email == email && o.Password == password);
            if (user == null) return null;
            return user;
        }
        public async Task<User> Get(int id)
        {
            var user = await _restContext.Users.FirstOrDefaultAsync(o => o.Id == id);
            if (user == null) return null;
            return user;
        }
        public async Task<User> Create(User user)
        {
            _restContext.Users.Add(user);
            await _restContext.SaveChangesAsync();
            return user;
        }
        public async Task<User> Put(User user)
        {
            _restContext.Users.Update(user);

            await _restContext.SaveChangesAsync();

            return user;
        }
        public async Task Delete(User user)
        {
            _restContext.Users.Remove(user);

            await _restContext.SaveChangesAsync();
        }
    }
}
