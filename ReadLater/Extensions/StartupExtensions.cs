using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;

namespace ReadLater.Extensions
{
    public static class StartupExtensions
    {
     public static void UseRootNodeModules(this IWebHostEnvironment hostingEnvironment)
    {
        var nodeDir = Path.Combine(hostingEnvironment.ContentRootPath, "../node_modules");
        Environment.SetEnvironmentVariable("NODE_PATH", nodeDir);
    }
    }
}
