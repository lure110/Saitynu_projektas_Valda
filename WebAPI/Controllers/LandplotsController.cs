using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webAPI.Data.Dtos.Landplots;
using webAPI.Data.Entities;
using webAPI.Data.Repositories;

namespace webAPI.Controllers
{
    [EnableCors]
    [Route("api/regions/{regionId}/landplots")]
    [ApiController]
    public class LandplotsController : ControllerBase
    {
        /*
            landplot
            /api/regions/{id}/landplots GET ALL 200 <- Gauti visus
            /api/regions/{id}/landplots/{id} GET 200 <- Gauti viena
            /api/regions/{id}/landplots POST 201 <- Sukurti viena
            /api/regions/{id}/landplots/{id} PUT 200 <- Redaguoti viena
            /api/regions/{id}/landplots/{id} DELETE 200/204 <- Sunaikinti viena

            {
	            "address": "some address",
	            "owner": "First and last name"
            }
        */

        private readonly ILandplotsRepository _landplotsRepository;
        private readonly IMapper _mapper;
        private readonly IRegionsRepository _regionsRepository;

        public LandplotsController(ILandplotsRepository landplotsRepository, IMapper mapper, IRegionsRepository regionsRepository)
        {
            _landplotsRepository = landplotsRepository;
            _mapper = mapper;
            _regionsRepository = regionsRepository;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IEnumerable<LandplotDto>> GetAll(int regionId)
        {
            var landplots = await _landplotsRepository.GetAll(regionId);
            return landplots.Select(o => _mapper.Map<LandplotDto>(o));
        }

        [HttpGet("{landplotId}")]
        [AllowAnonymous]
        public async Task<ActionResult<LandplotDto>> Get(int regionId, int landplotId)
        {
            var landplot = await _landplotsRepository.Get(regionId, landplotId);
            if (landplot == null) return NotFound();
            
            return Ok(_mapper.Map<LandplotDto>(landplot));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<ActionResult<LandplotDto>> Post(int regionId, CreateLandplotDto landplotDto)
        {
            var region = await _regionsRepository.Get(regionId);
            if (region == null) return NotFound();

            var landplot = _mapper.Map<Landplot>(landplotDto);

            landplot.Region = region;
            landplot.Region.Id = regionId;

            await _landplotsRepository.Insert(landplot);

            return Created($"/api/regions/{regionId}/landplots/{landplot.Id}", _mapper.Map<LandplotDto>(landplot));
        }

        [HttpPatch("{landplotId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<ActionResult<LandplotDto>> Put(int regionId, int landplotId, UpdateLandplotDto landplotDto)
        {
            var region = await _regionsRepository.Get(regionId);
            if (region == null) return NotFound();

            var oldLandplot = await _landplotsRepository.Get(regionId, landplotId);
            if (oldLandplot == null) return NotFound();

            _mapper.Map(landplotDto, oldLandplot);

            await _landplotsRepository.Update(oldLandplot);

            return Ok(_mapper.Map<LandplotDto>(oldLandplot));
        }
        
        [HttpDelete("{landplotId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<ActionResult> Delete(int regionId, int landplotId)
        {
            var region = await _regionsRepository.Get(regionId);
            if (region == null) return NotFound();

            var landplot = await _landplotsRepository.Get(regionId, landplotId);
            if (landplot == null) return NotFound();

            await _landplotsRepository.Delete(landplot);

            //204
            return NoContent();
        }
    }
}
