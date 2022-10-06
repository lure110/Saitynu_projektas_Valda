using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webAPI.Data.Repositories;
using webAPI.Data.Entities;
using AutoMapper;
using webAPI.Data.Dtos.Regions;

namespace webAPI.Controllers
{
    /*
        region
        /api/regions GET ALL 200 <- Gauti visus
        /api/regions/{id} GET 200 <- Gauti viena
        /api/regions/ POST 201 <- Sukurti viena
        /api/regions/{id} PUT 200 <- Redaguoti viena
        /api/regions/{id} DELETE 200/204 <- Sunaikinti viena

        {
            "country" : "country name",
	        "region_name" : "some name",
	        "description" : "desc"
        }
    */
    [Route("api/regions")]
    [ApiController]
    public class RegionsController : ControllerBase
    {
        private readonly IRegionsRepository _regionsRepository;
        private readonly IMapper _mapper;
        public RegionsController(IRegionsRepository regionsRepository, IMapper mapper)
        {
            _regionsRepository = regionsRepository;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<IEnumerable<RegionDto>> GetAll()
        {
            return (await _regionsRepository.GetAll()).Select(o => _mapper.Map<RegionDto>(o));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Region>> Get(int id)
        {
            var region = await _regionsRepository.Get(id);
            if (region == null) return NotFound($"Region with id '{id}' not found.");

            return Ok(_mapper.Map<RegionDto>(region));
        }

        [HttpPost]
        public async Task<ActionResult<RegionDto>> Post(CreateRegionDto regionDto)
        {
            var region = _mapper.Map<Region>(regionDto);

            await _regionsRepository.Create(region);
            // 201 sukurta
            return Created($"/api/regions/{region.Id}", _mapper.Map<RegionDto>(region));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<RegionDto>> Put(int id, UpdateRegionDto regionDto)
        {
            var region = await _regionsRepository.Get(id);
            if (region == null) return NotFound($"Region with id '{id}' not found.");

            //region.Description = regionDto.Description;
            _mapper.Map(regionDto, region);


            await _regionsRepository.Put(region);


            return Ok(_mapper.Map<RegionDto>(region));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<RegionDto>> Delete(int id)
        {
            var region = await _regionsRepository.Get(id);
            if (region == null) return NotFound($"Region with id '{id}' not found.");

            await _regionsRepository.Delete(region);

            // 204
            return NoContent();
        }
    }
}
