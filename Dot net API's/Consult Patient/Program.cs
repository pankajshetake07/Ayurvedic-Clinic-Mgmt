using Consult_Patient.Models;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Globalization;
using Steeltoe.Discovery.Client;

namespace Consult_Patient
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddDbContext<p09_acmsdbContext>();
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    // Add the custom DateOnly converter
                    options.JsonSerializerOptions.Converters.Add(new DateOnlyConverter());
                    // Required to remove cyclic dependency error
                    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDiscoveryClient(builder.Configuration);

            


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseDiscoveryClient();

            // CORS
            //app.UseCors(policy => policy.AllowAnyHeader()
            //                .AllowAnyMethod()
            //                .SetIsOriginAllowed(origin => true)
            //                .AllowCredentials());

            //app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }

    // Custom DateOnly converter
    public class DateOnlyConverter : JsonConverter<DateOnly>
    {
        private const string DateFormat = "yyyy-MM-dd";

        public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var dateString = reader.GetString();
            return DateOnly.ParseExact(dateString, DateFormat, CultureInfo.InvariantCulture);
        }

        public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString(DateFormat, CultureInfo.InvariantCulture));
        }
    }
}