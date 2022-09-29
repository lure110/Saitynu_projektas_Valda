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
            return new List<Region>
            {
                new Region()
                {
                    Name = "name",
                    Description = "description",
                    CreationTimeUtc = DateTime.Now
                },
                new Region()
                {
                    Name = "name1",
                    Description = "description",
                    CreationTimeUtc = DateTime.Now
                }
            };
        }
        public async Task<Region> Get(int id)
        {
            return
                new Region()
                {
                    Name = "name1",
                    Description = "description",
                    CreationTimeUtc = DateTime.Now
                };
        }
        public async Task<Region> Create(Region region)
        {
            _restContext.Regions.Add(region);
            await _restContext.SaveChangesAsync();
            return region;
        }
        public async Task<Region> Put(Region region)
        {
            return
                new Region()
                {
                    Name = "name1",
                    Description = "description",
                    CreationTimeUtc = DateTime.Now
                };
        }
        public async Task Delete(Region region)
        {
        }
    }
}
