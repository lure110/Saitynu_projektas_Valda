using System.ComponentModel.DataAnnotations;

namespace webAPI.Data.Dtos.Landplots
{
    public record UpdateLandplotDto([Required] string Owner);
}
