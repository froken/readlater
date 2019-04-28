
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using ReadLater.BusinessLogic;
using ReadLater.Data;
using ReadLater.Database.Context;
using ReadLater.Database.UserSession;
using ReadLater.Extensions;
using ReadLater.Models;
using ReadLater.Services.Pocket;
using System;
using System.IO;
using System.Threading.Tasks;

namespace ReadLater
{
    public class Startup
    {
        public const string CookieScheme = "YourSchemeName";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            Mapper.Initialize(cfg => { cfg.AddProfile(new AutomapperProfile()); });

            services.AddAutoMapper();

            services.AddMvc().AddNewtonsoftJson();
            
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("authorization")));

            services.AddDbContext<ReadDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("read"),
                    x => x.MigrationsAssembly("ReadLater.Database")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

            services.AddAuthentication()
                .AddIdentityServerJwt();

            services.AddAuthentication(CookieScheme) 
                .AddCookie(CookieScheme, options =>
                {
                    options.AccessDeniedPath = "/account/denied";
                    options.LoginPath = "/account/login";
                });

           
            services.AddSingleton<IConfigureOptions<CookieAuthenticationOptions>, ConfigureMyCookie>();
            services.AddScoped<IPocketService, PocketService>();
            services.AddScoped<IUserSessionRepository, UserSessionRepository>();
            services.AddScoped<IUserSessionService, UserSessionService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
               // env.UseRootNodeModules();

                var webpackOptions = new WebpackDevMiddlewareOptions
                {
                    ConfigFile = "webpack.dev.js",
                    HotModuleReplacement = true,
                    ProjectPath = Path.Combine(env.ContentRootPath, "ClientApp/")
                };

                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(webpackOptions);
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            app.MapWhen(x => !x.Request.Path.Value.StartsWith("/api"), builder =>
            {
                builder.UseMvc(routes =>
                {
                    routes.MapSpaFallbackRoute(
                        name: "spa-fallback",
                        defaults: new { controller = "Home", action = "Index" });
                });
            });

            //app.UseRouting(routes =>
            //{
            //    routes.MapDefaultControllerRoute();

            //});

            app.UseAuthentication();

            app.UseAuthorization();
        }
    }

    public class IgnoreRouteMiddleware
    {

        private readonly RequestDelegate next;

        // You can inject a dependency here that gives you access
        // to your ignored route configuration.
        public IgnoreRouteMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Path.HasValue &&
                !context.Request.Path.Value.Contains("/api/"))
            {
                Console.WriteLine("Ignored!");
                return;
            }

            await next.Invoke(context);
        }
    }
}
