using Microsoft.EntityFrameworkCore;
using webAPI.Data.Entities;

namespace webAPI.Data.Repositories
{
    public interface IBuildingsRepository
    {
        Task Delete(Building building);
        Task<Building> Get(int regionId, int landplotId, int buildingId);
        Task<List<Building>> GetAll(int regionId, int landplotId);
        Task Insert(Building building);
        Task Update(Building building);
    }

    public class BuildingsRepository : IBuildingsRepository
    {
        private readonly RestContext _restContext;

        public BuildingsRepository(RestContext restContext)
        {
            _restContext = restContext;
        }

        public async Task<Building> Get(int regionId, int landplotId, int buildingId)
        {
            var building = await _restContext.Buildings.FirstOrDefaultAsync(o => o.Landplot.Region.Id == regionId && o.Landplot.Id == landplotId && o.Id == buildingId);
            if (building == null) return null!;
            return building;
        }

        public async Task<List<Building>> GetAll(int regionId, int landplotId)
        {
            return await _restContext.Buildings.Where(o => o.Landplot.Region.Id == regionId && o.Landplot.Id == landplotId).ToListAsync();
        }

        public async Task Insert(Building building)
        {
            _restContext.Buildings.Add(building);

            await _restContext.SaveChangesAsync();
        }
        public async Task Update(Building building)
        {
            _restContext.Buildings.Update(building);

            await _restContext.SaveChangesAsync();
        }
        public async Task Delete(Building building)
        {
            _restContext.Buildings.Remove(building);

            await _restContext.SaveChangesAsync();
        }
    }
}
