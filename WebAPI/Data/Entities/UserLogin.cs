using System.ComponentModel.DataAnnotations;

namespace webAPI.Data.Entities
{
    public class UserLogin
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
