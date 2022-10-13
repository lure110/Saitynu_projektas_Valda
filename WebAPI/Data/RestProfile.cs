using AutoMapper;
using webAPI.Data.Dtos.Buildings;
using webAPI.Data.Dtos.Landplots;
using webAPI.Data.Dtos.Regions;
using webAPI.Data.Dtos.Users;
using webAPI.Data.Entities;

namespace webAPI.Data
{
    public class RestProfile : Profile
    {
        public RestProfile()
        {
            CreateMap<Region, RegionDto>();
            CreateMap<CreateRegionDto, Region>();
            CreateMap<UpdateRegionDto, Region>();

            CreateMap<Landplot, LandplotDto>();
            CreateMap<CreateLandplotDto, Landplot>();
            CreateMap<UpdateLandplotDto, Landplot>();

            CreateMap<Building, BuildingDto>();
            CreateMap<CreateBuildingDto, Building>();
            CreateMap<UpdateBuildingDto, Building>();

            CreateMap<User, UserDto>();
            CreateMap<CreateUserDto, User>();
            CreateMap<UpdateUserDto, User>();
        }
    }
}
