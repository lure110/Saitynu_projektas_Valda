using System.ComponentModel.DataAnnotations.Schema;

namespace webAPI.Data.Entities
{
    public class Landplot
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public string Owner { get; set; }
        public DateTime CreationDateUtc { get; set; }

        public int RegionId { get; set; }
        public Region Region {get; set; }
    }
}
