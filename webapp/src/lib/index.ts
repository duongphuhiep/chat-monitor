import { action, query, redirect } from '@solidjs/router';
import { supabaseAnon } from '../supabase';
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
  const { data, error } = await supabaseAnon.auth.getUser(session?.jwt);
  if (error) {
    console.error('🚀 ~ getUser ~ error:', error);
    await logoutSession();
    throw redirect('/login');
  }
  return data.user;
}

async function async function _getConversationListRaw(_caller: string) {
  'use server';
  const currentUser = await getUserRaw('getConversationListRaw');
  // const conversationList = await supabaseAnon
  //   .from('chat_monitor.participation')
  //   .select('conversation_id')
  //   .eq('user_id', currentUser.id)
  //   .then((participations) => {
  //     const conversationIds = participations.data.map((participation) => participation.conversation_id);
  //     return supabaseAnon
  //       .from('chat_monitor.conversation')
  //       .select('id, subject, is_archived, is_public')
  //       .in('id', conversationIds);
  //   });
  //return conversationList.data;
  
  const participations = await supabaseAnon
    .from('chat_monitor.participation')
    .select('conversation_id')
    .eq('user_id', currentUser.id);

  if (participations.error) {
    console.error('Error fetching participations:', participations.error);
    throw new Error('Failed to fetch participations');
  }

  const conversationIds = participations.data.map((participation) => participation.conversation_id);

  const conversations = await supabaseAnon
    .from('chat_monitor.conversation')
    .select('id, subject, is_archived, is_public')
    .in('id', conversationIds);

  if (conversations.error) {
    console.error('Error fetching conversations:', conversations.error);
    throw new Error('Failed to fetch conversations');
  }

  return conversations.data;
}

export const getUser = query(getUserRaw, 'user');

export const loginOrRegister = action(async (formData: FormData) => {
  'use server';
  const email = String(formData.get('username'));
  const password = String(formData.get('password'));
  const loginType = String(formData.get('loginType'));
  const validationError = validateUsername(email) || validatePassword(password);
  if (validationError) return new Error(validationError);

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
