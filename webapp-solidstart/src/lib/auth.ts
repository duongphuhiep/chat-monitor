import { action, query, redirect } from '@solidjs/router';
import { createSupabaseAnon } from '../supabase';
import { getOrInitSessionData, loginSession, logoutSession } from './session';

async function getUserRaw(caller: string) {
  'use server';
  console.log(`getUser is called by ${caller}`);
  const session = await getOrInitSessionData();
  //not login yet
  if (!session?.jwt) {
    console.info('not login yet, redirect to the login page');
    throw redirect('/login');
  }
  //get user
  const supabaseAnon = createSupabaseAnon();
  const { data, error } = await supabaseAnon.auth.getUser(session?.jwt);
  if (error) {
    console.error('🚀 ~ getUser ~ error:', error);
    await logoutSession();
    throw redirect('/login');
  }
  return data.user;
}
export const getUser = query(getUserRaw, 'user');

export const loginOrRegister = action(async (formData: FormData) => {
  'use server';
  const email = String(formData.get('username'));
  const password = String(formData.get('password'));
  const loginType = String(formData.get('loginType'));
  const validationError = validateUsername(email) || validatePassword(password);
  if (validationError) return new Error(validationError);

  const supabaseAnon = createSupabaseAnon();
  if (loginType === 'register') {
    const confirmPassword = String(formData.get('confirm-password'));
    if (confirmPassword !== password) {
      throw new Error('Confirm Password does not match');
    }
    const { data: _, error } = await supabaseAnon.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.log('🚀 ~ signUp ~ error:', error);
      throw error;
    }
  } else {
    //login
    const { data, error } = await supabaseAnon.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log('🚀 ~ signInWithPassword ~ error:', error);
      throw error;
    }
    await loginSession({
      jwt: data?.session?.access_token,
      refreshToken: data?.session?.refresh_token,
      userEmail: email,
      userId: data?.user?.id,
    });
  }
  return redirect('/');
});

export const logout = action(async () => {
  'use server';
  await logoutSession();
  return redirect('/login');
});

function validateUsername(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return `Invalid email format`;
  }
}

function validatePassword(password: string) {
  if (typeof password !== 'string' || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}
