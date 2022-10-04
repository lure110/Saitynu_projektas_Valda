using Microsoft.EntityFrameworkCore;
using System.Collections;
using webAPI.Data.Entities;

namespace webAPI.Data.Repositories
{
    public interface IRegionsRepository
    {
        Task<Region> Create(Region region);
        Task Delete(Region region);
        Task<Region> Get(int id);
        Task<IEnumerable<Region>> GetAll();
        Task<Region> Put(Region region);
    }

    public class RegionsRepository : IRegionsRepository
    {
        private readonly RestContext _restContext;

        public RegionsRepository(RestContext restContext)
        {
            _restContext = restContext;
        }

        public async Task<IEnumerable<Region>> GetAll()
        {
            return await _restContext.Regions.ToListAsync();
        }
        public async Task<Region> Get(int id)
        {
            var region = await _restContext.Regions.FirstOrDefaultAsync(o => o.Id == id);
            if (region == null) return null;
            return region;
        }
        public async Task<Region> Create(Region region)
        {
            _restContext.Regions.Add(region);
            await _restContext.SaveChangesAsync();
            return region;
        }
        public async Task<Region> Put(Region region)
        {
            _restContext.Regions.Update(region);

            await _restContext.SaveChangesAsync();

            return region;
        }
        public async Task Delete(Region region)
        {
            _restContext.Regions.Remove(region);

            await _restContext.SaveChangesAsync();
        }
    }
}
