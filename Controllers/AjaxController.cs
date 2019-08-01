using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ToolBox;

namespace jlsCore.Controllers
{

    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AjaxController : ControllerBase
    {
        
        [HttpPost]
        public async Task<IActionResult> dbGetResultAsJson(JToken param)
        {
            List<object> result = new List<object>();

            try
            {

                Dictionary<string, object> data = JsonConvert.DeserializeObject<Dictionary<string, object>>(param["jsonParam"].ToString());
                bool hasNext = true;


                using (SqlDataReader dr = await Helper.DB.GetTableAsync(param["spName"].ToString(), data, param["logging"].ToString(), true))
                {

                    while (hasNext)
                    {
                        result.Add(Helper.DB.GetJsonSerialize(dr));
                        hasNext = await dr.NextResultAsync();
                    }

                    dr.Close();
                }

                if (result.Count == 1)
                {
                    return Ok(result[0]);
                }
                else{
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                Helper.DB.SetLog("sys", MethodBase.GetCurrentMethod().Name, "에러", ex.ToString());
                return Ok("");
            }
        }



        public ContentResult dbGetResultAsStr(string spName, string jsonParam, string working = null, string logging = null)
        {

            try
            {
                Dictionary<string, object> param = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonParam);

                return Content(Helper.DB.GetResultAsStr(spName, param, logging, true));

            }
            catch (Exception ex)
            {
                Helper.DB.SetLog("sys", MethodBase.GetCurrentMethod().Name, "에러", ex.ToString());
                return Content(null);
            }
        }



        public JsonResult dbGetResultAsInt(string spName, string jsonParam, string working = null)
        {
            try
            {
                string logging = "";
                Dictionary<string, object> param = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonParam.Replace("\\\\", "\\"));


                param.Add("user_id", "admin");

                return new JsonResult(Helper.DB.GetResultAsInt(spName, param, logging, true));

            }
            catch (Exception ex)
            {
                Helper.DB.SetLog("sys", MethodBase.GetCurrentMethod().Name, "에러", ex.ToString());

                return new JsonResult(new ajaxError(ex.Message));
            }
        }
        public class Category
        {
            public string category_name;
            public int category_id;
            public int parent_id;
            public string hierarchy_id;
            public int id;
            public string name;
            public List<Category> children = new List<Category>();
        }
         [HttpPost]
        public async Task<JsonResult> CategoryData(JToken data)
        {
            dynamic param = new
            {
                user_id = data["user_id"].ToString()
            };
            
            List<Category> items = JsonConvert.DeserializeObject<List<Category>>(Helper.DB.GetResultAsJson("category_get", param));


           var lookup = items.ToLookup(x => x.parent_id);
           Func<int, List<Category>> build = null;

           build = pid =>
                lookup[pid]
                    .Select(x => new Category()
                    {
                        id = x.category_id,
                        name = x.category_name,
                        children = build(x.category_id),
                    })
                    .ToList(); 

             return new JsonResult(build(0));
        }



        public class Board
        {
            public string board_type;
            public int board_id;
            public int category_id;
        }

        [HttpPost]
        public async Task<JsonResult> BoardData(JToken data)
        {
            dynamic param = new
            {
                category_id = data["category_id"].ToString(),
                user_id = data["user_id"].ToString()
            };
            
            List<Board> board = JsonConvert.DeserializeObject<List<Board>>(Helper.DB.GetResultAsJson("board_get", param));

            board.Select(x => new Board()
                    {
                        board_id = x.board_id,
                        board_type = x.board_type
                    })
                    .ToList(); 

             return new JsonResult(board);
        }



    }

    internal class ajaxError
    {
        public string errormsg { get; set; }
        public ajaxError(string msg)
        {
            this.errormsg = msg;
        }
    }
}
