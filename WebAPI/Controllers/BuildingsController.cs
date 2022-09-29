using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webAPI.Controllers
{
    [Route("api/regions/{regionId}/landplots/{landplotId}/buildings")]
    [ApiController]
    public class BuildingsController : ControllerBase
    {
    }
}
