using Microsoft.EntityFrameworkCore;
using webAPI.Data.Entities;

namespace webAPI.Data.Repositories
{
    public interface ILandplotsRepository
    {
        Task Delete(Landplot landplot);
        Task<Landplot> Get(int regionId, int landplotId);
        Task<List<Landplot>> GetAll(int regionId);
        Task Insert(Landplot landplot);
        Task Update(Landplot landplot);
    }

    public class LandplotsRepository : ILandplotsRepository
    {
        private readonly RestContext _restContext;

        public LandplotsRepository(RestContext restContext)
        {
            _restContext = restContext;
        }

        public async Task<Landplot> Get(int regionId, int landplotId)
        {
            var landplot = await _restContext.Landplots.FirstOrDefaultAsync(o => o.RegionId == regionId && o.Id == landplotId);
            if (landplot == null) return null;
            return landplot;
        }
        public async Task<List<Landplot>> GetAll(int regionId)
        {
            return await _restContext.Landplots.Where(o => o.RegionId == regionId).ToListAsync();
        }
        public async Task Insert(Landplot landplot)
        {
            _restContext.Landplots.Add(landplot);

            await _restContext.SaveChangesAsync();
        }
        public async Task Update(Landplot landplot)
        {
            _restContext.Landplots.Update(landplot);

            await _restContext.SaveChangesAsync();
        }
        public async Task Delete(Landplot landplot)
        {
            _restContext.Landplots.Remove(landplot);

            await _restContext.SaveChangesAsync();
        }
    }
}
