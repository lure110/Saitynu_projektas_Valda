using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webAPI.Data.Dtos.Buildings;
using webAPI.Data.Dtos.Landplots;
using webAPI.Data.Entities;
using webAPI.Data.Repositories;

namespace webAPI.Controllers
{
    [EnableCors]
    [Route("api/regions/{regionId}/landplots/{landplotId}/buildings")]
    [ApiController]
    public class BuildingsController : ControllerBase
    {
        /*
            building
            /api/regions/{id}/landplots/{id}/buildings GET ALL 200 <- Gauti visus
            /api/regions/{id}/landplots/{id}/buildings/{id} GET 200 <- Gauti viena
            /api/regions/{id}/landplots/{id}/buildings POST 201 <- Sukurti viena
            /api/regions/{id}/landplots/{id}/buildings/{id} PUT 200 <- Redaguoti viena
            /api/regions/{id}/landplots/{id}/buildings/{id} DELETE 200/204 <- Sunaikinti viena

            {
	            "building_name": "name",
	            "building_type": "grain/canola/barley",
	            "building_size": 1000,
	            "building_occupancy": 1000
            }
         */

        private readonly ILandplotsRepository _landplotsRepository;
        private readonly IMapper _mapper;
        private readonly IRegionsRepository _regionsRepository;
        private readonly IBuildingsRepository _buildingsRepository;

        public BuildingsController(ILandplotsRepository landplotsRepository, IMapper mapper, IRegionsRepository regionsRepository, IBuildingsRepository buildingsRepository)
        {
            _landplotsRepository = landplotsRepository;
            _mapper = mapper;
            _regionsRepository = regionsRepository;
            _buildingsRepository = buildingsRepository;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IEnumerable<BuildingDto>> GetAll(int regionId, int landplotId)
        {
            var buildings = await _buildingsRepository.GetAll(regionId, landplotId);
            return buildings.Select(o => _mapper.Map<BuildingDto>(o));
        }


        [HttpGet("{buildingId}")]
        [AllowAnonymous]
        public async Task<ActionResult<BuildingDto>> Get(int regionId, int landplotId, int buildingId)
        {
            var building = await _buildingsRepository.Get(regionId, landplotId, buildingId);
            if (building == null) return NotFound();

            return Ok(_mapper.Map<BuildingDto>(building));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Manager, Administrator")]
        public async Task<ActionResult<BuildingDto>> Post(int regionId, int landplotId, CreateBuildingDto buildingDto)
        {
            var region = await _regionsRepository.Get(regionId);
            if (region == null) return NotFound();

            var landplot = await _landplotsRepository.Get(regionId, landplotId);
            if (region == null) return NotFound();

            var building = _mapper.Map<Building>(buildingDto);

            building.Landplot = landplot;
            building.Landplot.Region = region;
            

            await _buildingsRepository.Insert(building);

            return Created($"/api/regions/{regionId}/landplots/{landplotId}/buildings/{building.Id}", _mapper.Map<BuildingDto>(building));
        }

        [HttpPatch("{buildingId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Manager, Administrator")]
        public async Task<ActionResult<BuildingDto>> Put(int regionId, int landplotId, int buildingId, UpdateBuildingDto buildingDto)
        {
            var region = await _regionsRepository.Get(regionId);
            if (region == null) return NotFound();

            var landplot = await _landplotsRepository.Get(regionId, landplotId);
            if (landplot == null) return NotFound();

            var oldBuilding = await _buildingsRepository.Get(regionId, landplotId, buildingId);
            if (oldBuilding == null) return NotFound();

            _mapper.Map(buildingDto, oldBuilding);

            await _buildingsRepository.Update(oldBuilding);

            return Ok(_mapper.Map<BuildingDto>(oldBuilding));
        }

        [HttpDelete("{buildingId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<ActionResult> Delete(int regionId, int landplotId, int buildingId)
        {
            var region = await _regionsRepository.Get(regionId);
            if (region == null) return NotFound();

            var landplot = await _landplotsRepository.Get(regionId, landplotId);
            if (landplot == null) return NotFound();


            var building = await _buildingsRepository.Get(regionId, landplotId, buildingId);
            if (building == null) return NotFound();
            await _buildingsRepository.Delete(building);

            //204
            return NoContent();
        }
    }
}
