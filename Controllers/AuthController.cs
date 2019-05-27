using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using jlsCore.Models;
using jlsCore.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Vue2Spa.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AccountService _accountService;

        public AuthController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        public IActionResult Login([FromBody]Login login)
        {
            var token = _accountService.Login(login);

            if (token == null)
            {
                return Ok("");
            }

            return Ok(token);
        }

        [HttpGet]
        public IActionResult View()
        {
            return Ok("You can view invoices!");
        }

        [Authorize(Roles = "Administrator,Accountant")]
        [HttpGet]
        public IActionResult Create()
        {
            var userIdClaim = HttpContext.User.Claims.Where(x => x.Type == "userid").SingleOrDefault();
            return Ok($"Your User ID is {userIdClaim.Value} and you can create invoices!");
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet]
        public IActionResult Delete()
        {
            var userIdClaim = HttpContext.User.Claims.Where(x => x.Type == "userid").SingleOrDefault();
            return Ok($"Your User ID is {userIdClaim.Value} and you can delete invoices!");
        }
    }
}
