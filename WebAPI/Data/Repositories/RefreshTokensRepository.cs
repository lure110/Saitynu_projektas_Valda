using Microsoft.EntityFrameworkCore;
using webAPI.Data;
using webAPI.Data.Dtos.Regions;
using webAPI.Data.Entities;
using webAPI.Migrations;

namespace webAPI.Data.Repositories
{
    public interface IRefreshTokensRepository
    {
        Task<RefreshToken> Create(RefreshToken refreshToken);
        Task<RefreshToken> GetByToken(string token);
        Task<IEnumerable<RefreshToken>> GetAll();
        Task Delete(RefreshToken token);

        Task DeleteAll(int userId);
    }

    public class RefreshTokensRepository : IRefreshTokensRepository
    {
        private readonly RestContext _restContext;

        public RefreshTokensRepository(RestContext restContext)
        {
            _restContext = restContext;
        }

        public Task<RefreshToken> GetByToken(string token)
        {
            RefreshToken refreshToken = _restContext.RefreshTokens.FirstOrDefault(x => x.Token == token);

            return Task.FromResult(refreshToken);
        }
        public async Task<RefreshToken> Create(RefreshToken refreshToken)
        {
            _restContext.RefreshTokens.Add(refreshToken);
            await _restContext.SaveChangesAsync();
            return refreshToken;
        }

        public async Task<IEnumerable<RefreshToken>> GetAll()
        {
            return await _restContext.RefreshTokens.ToListAsync();
        }

        public async Task Delete(RefreshToken token)
        {
            _restContext.RefreshTokens.Remove(token);

            await _restContext.SaveChangesAsync();
        }

        public async Task DeleteAll(int userId)
        {

            _restContext.RefreshTokens.RemoveRange(_restContext.RefreshTokens.Where(x => x.UserId == userId));
            
            await _restContext.SaveChangesAsync();
        }
    }
}
