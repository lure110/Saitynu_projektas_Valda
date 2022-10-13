namespace webAPI.Helpers
{
    public class AuthenticationConfiguration
    {
        public string Key { get; set; }
        public double ExpirationTimeInMinutes { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }

        public string RefreshKey { get; set; }
        
        public double RefreshExpirationTimeInMinutes { get; set; }
    }
}
