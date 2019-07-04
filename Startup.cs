using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using jlsCore.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ToolBox;

namespace jlsCore
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IHostingEnvironment env)
        {
              //config 정보 호출
              Configuration = new ConfigurationBuilder()
                           .SetBasePath(env.ContentRootPath)
                           .AddJsonFile("appSettings.json")
                           .Build();
        }


        // This method gets called by the runtime. Use this method to add services to the container.
         public void ConfigureServices(IServiceCollection services)
        {

            // jwt 토큰 생성
            services.AddTransient<AccountService>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                var signingKey = Convert.FromBase64String(Configuration["Jwt:SigningSecret"]);
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.Zero,
                    IssuerSigningKey = new SymmetricSecurityKey(signingKey)
                };
            });

            //호환성 버전 지정
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //개발 환경
            if (env.IsDevelopment())
            {
                //개발 예외페이지
                app.UseDeveloperExceptionPage();

                //Webpack 실시간모듈교체(HMR) 사용 등록
                //Config 파일 경로 지정
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ConfigFile = Path.Combine(env.ContentRootPath, @"node_modules\@vue\cli-service\webpack.config.js")
                });
            }
            else
            {
                // production 예외처리
                app.UseExceptionHandler(errorApp =>
                {
                        errorApp.Run(async context =>
                        {
                            context.Response.StatusCode = 500;
                            context.Response.ContentType = "text/html";

                            await context.Response.WriteAsync("<html lang=\"en\"><body>\r\n");
                            await context.Response.WriteAsync("ERROR!<br><br>\r\n");

                            var exceptionHandlerPathFeature = 
                                context.Features.Get<IExceptionHandlerPathFeature>();

                            // Use exceptionHandlerPathFeature to process the exception (for example, 
                            // logging), but do NOT expose sensitive error information directly to 
                            // the client.

                            if (exceptionHandlerPathFeature?.Error is FileNotFoundException)
                            {
                                await context.Response.WriteAsync("File error thrown!<br><br>\r\n");
                            }

                            await context.Response.WriteAsync("<a href=\"/\">Home</a><br>\r\n");
                            await context.Response.WriteAsync("</body></html>\r\n");
                            await context.Response.WriteAsync(new string(' ', 512)); // IE padding
                        });
                    });

                // https 사용
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // jwt 인증
            app.UseAuthentication();
            app.UseMvc();
            // 정적 파일 사용 - 경로 path 단축
            app.UseStaticFiles();
            
          
            // here you can see we make sure it doesn't start with /api, if it does, it'll 404 within .NET if it can't be found
            // 호출 url에 api 문구가 없다면 vue 실행
            app.MapWhen(x => !x.Request.Path.Value.StartsWith("/api"), builder =>
            {
                builder.UseMvc(routes =>
                {
                    routes.MapSpaFallbackRoute(
                        name: "spa-fallback",
                        defaults: new { controller = "Home", action = "Index" });
                });
            });

            // DB connection 경로 초기세팅
            Helper.DB.db_conn = Configuration["ConnectionStrings:DefaultConnection"];
        }
    }
}
