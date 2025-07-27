using dotenv.net;

DotEnv.Load(options: new DotEnvOptions(envFilePaths: new[] { "/home/hiep/fun/chat-monitor/supabase/compose/.env" }));

var url = Environment.GetEnvironmentVariable("API_EXTERNAL_URL");
var key = Environment.GetEnvironmentVariable("ANON_KEY");

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

Console.WriteLine(session.AccessToken);
