import { createSupabaseAdmin, createSupabaseAnon } from '../shared/supabase';
import { test, expect } from 'vitest';

test('register and signin success', async () => {
  const UserEmail = `test_${Date.now()}@supabasetest.com`;
  const supabaseAnon = createSupabaseAnon();

  let newUserId: string | null | undefined;
  {
    // register
    const { data, error } = await supabaseAnon.auth.signUp({
      email: UserEmail,
      password: 'password',
    });
    if (error?.code == 'user_already_exists') {
      console.log('user_already_exists - continue the test');
    } else {
      expect(error).toBeNull();
      newUserId = data?.user?.id;
      expect(newUserId).toBeTruthy();
    }
  }
  let jwtToken: string | null | undefined;
  let refreshToken: string | null | undefined;
  {
    // signin returns jwt
    const { data, error } = await supabaseAnon.auth.signInWithPassword({
      email: UserEmail,
      password: 'password',
    });
    expect(error).toBeNull();
    jwtToken = data?.session?.access_token;
    refreshToken = data?.session?.refresh_token;
    expect(jwtToken).toBeTruthy();
    expect(refreshToken).toBeTruthy();
  }
  {
    // get user from jwt
    const { data: _, error } = await supabaseAnon.auth.getUser(jwtToken);
    expect(error).toBeNull();
  }

  const supabaseAdmin = createSupabaseAdmin();
  {
    // list users
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    expect(error).toBeNull();
    newUserId = data?.users?.find((user) => user.email === UserEmail)?.id;
  }
  {
    // delete user
    const { data: _, error } = await supabaseAdmin.auth.admin.deleteUser(
      newUserId as string
    );
    expect(error).toBeNull();
  }
});

test('query conversation ok', async () => {
  let userId: string | undefined;
  const supabaseAnon = createSupabaseAnon();
  // signin returns jwt
  {
    const { data, error } = await supabaseAnon.auth.signInWithPassword({
      email: 'minh@email.com',
      password: 'aaaaaa',
    });
    expect(error).toBeNull();
    userId = data.user?.id;
  }
  //get conversation
  {
    //get currentUserId
    const {
      data: { user: currentUser },
      error: getUserError,
    } = await supabaseAnon.auth.getUser();
    expect(getUserError).toBeNull();
    expect(currentUser?.id).toBe(userId);

    const { data: conversations, error: conversationsError } =
      await supabaseAnon.rpc('get_conversations', {
        participant_user_id: userId,
      });
    expect(conversationsError).toBeNull();
    console.log('🚀 ~ test ~ conversations:', conversations);
  }
  // signout
  await supabaseAnon.auth.signOut();
});

test('query conversation without login should failed', async () => {
  const userId = '11111111-1111-1111-1111-111111111111';
  const supabaseAnon = createSupabaseAnon();

  //get conversation
  {
    const { data: _, error: conversationsError } = await supabaseAnon.rpc(
      'get_conversations',
      {
        participant_user_id: userId,
      }
    );
    console.log('🚀 ~ test ~ conversations:', conversationsError);
    expect(conversationsError).not.toBeNull();
    expect(conversationsError?.code).toBe('42501');
  }
});
