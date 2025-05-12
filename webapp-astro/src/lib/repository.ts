import { query, redirect } from '@solidjs/router';
import { createSupabaseAnon } from '../supabase';
import { type Conversation } from './database';
import { getOrInitSessionData } from './session';

async function queryConversationListRaw() {
  const sessionData = await getOrInitSessionData();
  console.info(
    'queryConversationListRaw is called by ',
    sessionData.userEmail,
    sessionData.userId
  );

  if (!sessionData.jwt || !sessionData.refreshToken) {
    throw redirect('/login');
  }

  const supabaseAnon = createSupabaseAnon();

  await supabaseAnon.auth.setSession({
    access_token: sessionData.jwt!,
    refresh_token: sessionData.refreshToken!,
  });

  const { data, error } = await supabaseAnon.rpc('get_conversations', {
    participant_user_id: sessionData.userId,
  });
  if (error) {
    console.error('🚀 ~ queryConversationListRaw ~ error:', error);
    throw error;
  }
  return data as Conversation[];
}

export const queryConversationList = query(async () => {
  'use server';
  return await queryConversationListRaw();
}, 'conversations');
