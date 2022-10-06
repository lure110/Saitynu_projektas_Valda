using System.ComponentModel.DataAnnotations;

namespace webAPI.Data.Dtos.Regions
{
    public record CreateRegionDto([Required] string Country, [Required] string Name, [Required] string Description);

}
