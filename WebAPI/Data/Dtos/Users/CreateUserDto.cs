using System.ComponentModel.DataAnnotations;

namespace webAPI.Data.Dtos.Users
{
    public record CreateUserDto( [Required] string Name, [Required] string Email, [Required] string Password, string? Role = null);
}
