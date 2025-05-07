import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const SUPABASE_API_URL = process.env.SUPABASE_API_URL as string;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY as string;
const SUPABASE_SERVICE_ROLE_KEY = process.env
  .SUPABASE_SERVICE_ROLE_KEY as string;

if (!SUPABASE_API_URL) {
  console.error('SUPABASE_API_URL is not defined');
  process.exit(1);
}

export const createSupabaseAnon = () =>
  createClient(SUPABASE_API_URL, SUPABASE_ANON_KEY);
export const createSupabaseAdmin = () =>
  createClient(SUPABASE_API_URL, SUPABASE_SERVICE_ROLE_KEY);

const supabaseAdmin = createSupabaseAdmin();

async function getUserId(userEmail: string): Promise<string | undefined> {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();
  if (error) {
    throw error;
  }
  return data?.users?.find((user) => user.email === userEmail)?.id;
}

export async function dropUser(userEmail: string): Promise<void> {
  const userId = await getUserId(userEmail);
  if (userId) {
    const { data: _, error } =
      await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) {
      throw error;
    }
  }
}
