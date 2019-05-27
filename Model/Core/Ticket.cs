using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Security.Principal;
using System.Web;
using ToolBox;

namespace jlsCore.Models
{
    public class Ticket
    {
        public String sessionId { get; set; }
        public String connectId { get; set; }
        public String ipAddress { get; set; }
        public int member_id { get; set; }
        public String user_id { get; set; }
        public String name { get; set; }
        public String position { get; set; }
        public String department_name { get; set; }
        public String department_id { get; set; }
        public int is_category_auth { get; set; }
        public String mobile { get; set; }
        public String email { get; set; }
        public String nameP { get { return name + " " + position; } }
        public String token { get; set; }
        public String role { get; set; }

        public Ticket()
        {

        }

        public Ticket(SqlDataReader dr)
        {
            this.member_id =            Helper.Data.Get<int>(dr["member_id"], -1);
            this.name =                 WebUtility.UrlEncode(Helper.Data.GetTrimStr(dr["name"]));
            this.user_id =              WebUtility.UrlEncode(Helper.Data.GetTrimStr(dr["user_id"]));
            this.department_name =      WebUtility.UrlEncode(Helper.Data.GetTrimStr(dr["department_name"]));
            this.department_id =        WebUtility.UrlEncode(Helper.Data.GetTrimStr(dr["department_id"], ""));
            this.position =             WebUtility.UrlEncode(Helper.Data.GetTrimStr(dr["position"]));
            this.is_category_auth =     Helper.Data.Get<int>(dr["is_category_auth"], -1);
            this.mobile =               WebUtility.UrlEncode(Helper.Data.GetTrimStr(dr["mobile"]));
            this.email =                WebUtility.UrlEncode(Helper.Data.GetTrimStr(dr["email"]));
            this.role = (this.user_id == "admin" ? "administrator" : "Accountant");
            this.sessionId = "";

            //JObject o = JObject.Parse(dr["school"].ToString());
            //this.code = Helper.Data.GetTrimStr(o["code"]);
            //this.schoolName = Helper.Data.GetTrimStr(o["name"]);

        }



        public void updateSessionData(String sessionId, String agent)
        {
            this.sessionId = Helper.Data.GetTrimStr(sessionId);
        }

        public void updateUserData(Ticket source, String ip)
        {
            if (source == null)
            {
                clearUserData();
                return;
            }
            this.member_id = Helper.Data.Get<int>(source.member_id, -1);
            this.name = Helper.Data.GetTrimStr(source.name);
            this.user_id = Helper.Data.GetTrimStr(source.user_id);
            this.name = Helper.Data.GetTrimStr(source.name);
            this.department_name = Helper.Data.GetTrimStr(source.department_name);
            this.position = Helper.Data.GetTrimStr(source.position);
            this.is_category_auth = Helper.Data.Get<int>(source.is_category_auth, -1);
            this.mobile = Helper.Data.GetTrimStr(source.mobile);
            this.email = Helper.Data.GetTrimStr(source.email);
            this.ipAddress = Helper.Data.GetTrimStr(source.ipAddress);
            this.sessionId = source.sessionId;

        }


        public void clearUserData()
        {
            this.member_id = -1;
            this.name = string.Empty;
            this.user_id = string.Empty;
            this.name = string.Empty;
            this.department_name = string.Empty;
            this.position = string.Empty;
            this.is_category_auth = -1;
            this.mobile = string.Empty;
            this.email = string.Empty;
            this.ipAddress = string.Empty;
            this.sessionId = string.Empty;
            this.token = string.Empty;

        }
    }
}
