using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using ToolBox;
using jlsCore.Models;

namespace jlsCore.Models
{
    public class Login
    {
        public string user_id { get; set; }
        public string user_pw { get; set; }
    }

    public class User
    {
        public int member_id { get; set; }
        public string name { get; set; }
        public string user_id { get; set; }
        public string user_pw { get; set; }
        public int department_id { get; set; }
        public string position { get; set; }
        public string mobile { get; set; }
        public string email { get; set; }
        public bool is_category_auth { get; set; }
        public bool is_delete { get; set; }
        public bool is_use { get; set; }
        public DateTime create_date { get; set; }
        public string department_name { get; set; }
        public string Role { get; set; }
        public string token { get; set; }

     

        public Ticket signIn(Login login)
        {
            Ticket result = null;


            dynamic param = new
            {
                user_id = login.user_id,
                user_pw = login.user_pw,
                session_id = "",
                ip_address = Helper.Net.Client_IP
            };

            try
            {
                using (SqlDataReader dr = Helper.DB.GetTable("member_signin", param))
                {
                    if (dr.Read())
                    {
                        result = new Ticket(dr);

                        Helper.DB.SetLog(login.user_id, "member_signin", "로그인 성공(web)", param);
                    }
                    else
                    {
                        Helper.DB.SetLog(login.user_id, "member_signin", "로그인 실패(web)", param);
                    }
                }
            }
            catch (Exception ex)
            {
                Helper.DB.SetLog(login.user_id, "member_signin", "로그인 실패(web)", param);
            }

            return result;
        }
    }
}
