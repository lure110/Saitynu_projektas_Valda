using System.ComponentModel.DataAnnotations;

namespace webAPI.Data.Dtos.Buildings
{
    public record CreateBuildingDto([Required] string Name, [Required] string Type, [Required] int Size, int Occupancy);
}
