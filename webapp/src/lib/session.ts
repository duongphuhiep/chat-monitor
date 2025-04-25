import { getCookie, type SessionConfig, useSession } from 'vinxi/http';

const sessionConfig = {
  password: process.env.SOLID_SESSION_SECRET as string,
  name: 'auth',
} as SessionConfig;

interface SessionData {
  jwt?: string;
  refreshToken?: string;
}

async function getOrInitSession() {
  console.log('useSession is called');
  const session = await useSession<SessionData>(sessionConfig);
  return session;
}

export async function getOrInitSessionData() {
  console.log('getOrInitSessionData is called');
  const authCookie = getCookie('auth');
  console.log('authCookie.length=', authCookie?.length);
  // if (authCookie && authCookie.length < 1000) {
  //   console.log('shortcut for not logged, no need to init a new session');
  //   return {}; //no logged no need to getOrInitSession
  // }
  const session = await getOrInitSession();
  return session.data;
}

export async function loginSession(data: SessionData) {
  'use server';
  console.log('logoutSession is called');
  if (!data.jwt) {
    throw new Error('Invalid session data');
  }
  const session = await getOrInitSession();
  await session.update(data);
}

export async function logoutSession() {
  'use server';
  console.log('logoutSession is called');
  const session = await getOrInitSession();
  await session.update({ jwt: undefined, refreshToken: undefined });
}
