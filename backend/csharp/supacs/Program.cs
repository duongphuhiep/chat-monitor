using System.Text.Json;
using dotenv.net;

DotEnv.Load(options: new DotEnvOptions(envFilePaths: new[] { ".env" }));
var url = Environment.GetEnvironmentVariable("SP_API_URL");
var key = Environment.GetEnvironmentVariable("SP_anon_key");

//SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
//SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0

// url = "http://localhost:54323";
// key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

// url = "https://tzgzyqqrezxlurzvnytx.supabase.co";
// key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6Z3p5cXFyZXp4bHVyenZueXR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MDczMTYsImV4cCI6MjA2ODE4MzMxNn0.EtvXXR4ExfStI_GiPEDSp_ypn1oKMngnxc6RfXHuyNE";

Console.WriteLine($"url={url}, key={key}");

if (string.IsNullOrEmpty(url) || string.IsNullOrEmpty(key))
{
    throw new InvalidOperationException("Missing API_EXTERNAL_URL or SERVICE_ROLE_KEY");
}

var options = new Supabase.SupabaseOptions
{
    AutoConnectRealtime = true
};
var supabase = new Supabase.Client(url, key, options);
await supabase.InitializeAsync();

var session = await supabase.Auth.SignIn("minh@email.com", "aaaaaa");

Console.WriteLine(JsonSerializer.Serialize(session));