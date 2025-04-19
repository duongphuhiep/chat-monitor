import { createStorage } from "unstorage";

import { createClient } from "@supabase/supabase-js";

console.log('create supabase client');
const SUPABASE_API_URL = process.env.VITE_SUPABASE_API_URL as string;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(SUPABASE_API_URL, SUPABASE_ANON_KEY);

type User = {
  id: number;
  username: string;
  password: string;
};

export const db = {
  user: {
    async create({ data }: { data: { username: string; password: string } }) {
      
      const signUpResponse = await supabase.auth.signUp({
        email: "hiep1@example.com",
        password: "password"
      })
      console.log("🚀 ~ create ~ signUpResponse:", signUpResponse)
      return signUpResponse;
    },
    
    async findUnique({ where: { username = undefined, id = undefined } }: { where: { username?: string; id?: number } }) {
      const query = supabase.from<User>("users").select().limit(1);

      if (username) {
        query.eq("username", username);
      }
      if (id) {
        query.eq("id", id);
      }

      const { data, error } = await query.single();
      if (error) throw error;
      return data;
    }
  }
}

/**
const { data, error } = await supabase
        .from<User>("auth.users")
        .select()
        .filter("username", "eq", username)
        .or("id", "eq", id)
        .single();
      if (error) throw error;
      return data;
 */