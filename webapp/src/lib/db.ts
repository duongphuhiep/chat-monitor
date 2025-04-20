// import { AuthResponse, createClient, SignUpWithPasswordCredentials } from "@supabase/supabase-js";
// import { login } from "./server.ts";

// console.log('create supabase client');
// const SUPABASE_API_URL = Deno.env.get("VITE_SUPABASE_API_URL") as string;
// const SUPABASE_ANON_KEY = Deno.env.get("VITE_SUPABASE_ANON_KEY") as string;
// const supabase = createClient(SUPABASE_API_URL, SUPABASE_ANON_KEY);

// export const db = {
//   user: {
//     async create(data: SignUpWithPasswordCredentials): Promise<AuthResponse> {
//       return await supabase.auth.signUp(data);
//     },
//     async login(da): Promise<AuthResponse> {
//       return await supabase.auth.signInWithPassword(data);
//     }
//   }
// }