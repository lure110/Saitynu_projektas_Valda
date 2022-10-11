using System.ComponentModel.DataAnnotations;

namespace webAPI.Data.Dtos.Buildings
{
    public record UpdateBuildingDto([Required] string Type, [Required] int Size, [Required] int Occupancy);
}
