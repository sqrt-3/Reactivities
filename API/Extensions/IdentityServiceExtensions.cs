using System.Text;
using API.Services;
using Domain;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions;

public static class IdentityServiceExtensions
{
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
        string longerString = config["TokenKey"];
        byte[] largerUtf8Bytes = Encoding.UTF8.GetBytes(longerString);

        services.AddIdentityCore<AppUser>(opt =>
        {
            opt.Password.RequireNonAlphanumeric = false;
            opt.User.RequireUniqueEmail = true;
        })
        .AddEntityFrameworkStores<ReactivityDbContext>();
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
        {
            opt.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(largerUtf8Bytes),
                ValidateIssuer = false,
                ValidateAudience = false,
            };
        });
        services.AddAuthorization(option =>
        {
            option.AddPolicy("IsActivityHost", policy => policy.Requirements.Add(new IsHostRequirement()));
        });
        services.AddTransient<IAuthorizationHandler,IsHostRequirementHandler>();
        services.AddScoped<TokenService>();

        return services;
    }
}