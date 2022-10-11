namespace webAPI.Data.Entities
{
    public class Building
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int ? Size { get;set; }
        public int ? Occupancy { get; set; }

        public Landplot Landplot { get; set; }

    }
}
