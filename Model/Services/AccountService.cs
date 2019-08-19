
using jlsCore.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


namespace jlsCore.Services
{
    public class AccountService
    {

        private User user = new User();
        private readonly IConfiguration _configuration;

        public AccountService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string Login(Login login)
        {
            Ticket ticket = user.signIn(login);// _users.Where(x => x.Username == loginDto.Username && x.Password == loginDto.Password).SingleOrDefault();

            if (ticket == null)
            {
                return null;
            }

            var signingKey = Convert.FromBase64String(_configuration["Jwt:SigningSecret"]);
            var expiryDuration = int.Parse(_configuration["Jwt:ExpiryDuration"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = null,              // Not required as no third-party is involved
                Audience = null,            // Not required as no third-party is involved
                IssuedAt = DateTime.UtcNow,
                NotBefore = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddMinutes(expiryDuration),
                Subject = new ClaimsIdentity(new List<Claim> {
                        new Claim("userid", ticket.user_id.ToString()),
                        new Claim("name",  ticket.name.ToString()),
                        new Claim("position", ticket.position.ToString()),
                        new Claim("department_name", ticket.department_name.ToString()),
                        new Claim("department_id", ticket.department_id.ToString()),
                        new Claim("is_category_auth", ticket.is_category_auth.ToString()),
                        new Claim("mobile", ticket.mobile.ToString()),
                        new Claim("email", ticket.email.ToString()),
                        new Claim("nameP", ticket.nameP.ToString())
                    }),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(signingKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = jwtTokenHandler.CreateJwtSecurityToken(tokenDescriptor);
            var token = jwtTokenHandler.WriteToken(jwtToken);

            //ticket.token = token;

            return token;
        }
    }
}
