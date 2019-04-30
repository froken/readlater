
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
using ReadLater.BusinessLogic.Pocket;
using ReadLater.Data;
using ReadLater.Database.Context;
using ReadLater.Database.UserSession;
using ReadLater.Models;
using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace ReadLater
{
    public class Startup
    {
        public const string CookieScheme = "ReadLater";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AutomapperProfile());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);

            services.AddMvc().AddNewtonsoftJson();
            
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("authorization")));

            services.AddDbContext<ReadDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("read"),
                    x => x.MigrationsAssembly("ReadLater.Database")));

            services.AddIdentity<ApplicationUser, IdentityRole>(o =>
            {
                o.Password.RequireDigit = false;
                o.Password.RequireLowercase = false;
                o.Password.RequireUppercase = false;
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequiredLength = 6;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.Cookie.Name = ".readlater";
                    options.Cookie.SameSite = SameSiteMode.None;
                    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                    options.SlidingExpiration = true;
                });

            services.Configure<IdentityOptions>(options =>
            {
                options.User.RequireUniqueEmail = true;
            });

            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.ConfigureApplicationCookie(options =>
            {
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
            });

            

            services.AddScoped<IPocketService, PocketService>();
            services.AddScoped<IUserSessionRepository, UserSessionRepository>();
            services.AddScoped<IUserSessionService, UserSessionService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
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
            app.UseAuthentication();

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
