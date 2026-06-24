using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AirforceWebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Index(string cmd)
        {
            // Command injection vulnerability
            var process = Process.Start("bash", $"-c \"{cmd}\"");
            return Ok("Executed");
        }

        [HttpPost("upload")]
        public IActionResult Upload(string filename, string content)
        {
            // Arbitrary file write
            System.IO.File.WriteAllText($"/uploads/{filename}", content);
            return Ok("Uploaded");
        }
    }
}
