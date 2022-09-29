namespace webAPI.Data.Entities
{
    public class Region
    {
        public int Id { get; set; }
        public string Name {  get; set; }
        public string Description { get; set; }

        public DateTime CreationTimeUtc { get; set; }
    }
}
