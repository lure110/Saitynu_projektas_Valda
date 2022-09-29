using System.ComponentModel.DataAnnotations;

namespace webAPI.Data.Dtos.Regions
{
    public record UpdateRegionDto( [Required] string Description);
}
