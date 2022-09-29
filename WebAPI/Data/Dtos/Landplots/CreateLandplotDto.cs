using System.ComponentModel.DataAnnotations;

namespace webAPI.Data.Dtos.Landplots
{
    public record CreateLandplotDto([Required] string Address, [Required]string Owner);
}
