import { useSession } from "vinxi/http";

interface SessionData {
  jwt?: string;
  refreshToken?: string;
};

async function getSession() {
  const session = await useSession<SessionData>({
    password: process.env.SOLID_SESSION_SECRET as string,
    name: "jwt",
  });
  return session;
}

export async function getSessionData() {
  const session = await getSession();
  return session.data;
}

export async function loginSession(data: SessionData) {
  "use server";
  if (!data.jwt) {
    throw new Error("Invalid session data");
  }
  const session = await getSession();
  await session.update(data);
  console.log("🚀 ~ loginSession ~ success session update:")
}

export async function logoutSession() {
  console.log("logoutSession is called");
  const session = await getSession();
  await session.update({jwt: undefined, refreshToken: undefined});
}
