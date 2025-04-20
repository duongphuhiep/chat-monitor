// import { useSession } from "vinxi/http";
// import { db } from "./db";

// export function validateUsername(email: string) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     return `Invalid email format`;
//   }
// }

// export function validatePassword(password: string) {
//   if (typeof password !== "string" || password.length < 6) {
//     return `Passwords must be at least 6 characters long`;
//   }
// }

// export async function login(username: string, password: string) {
//   const user = await db.user.findUnique({ where: { username } });
//   if (!user || password !== user.password) throw new Error("Invalid login");
//   return user;
// }

// export async function logout() {
//   const session = await getSession();
//   await session.update(d => {
//     d.userId = undefined;
//   });
// }

// export async function register(username: string, password: string) {
//   const existingUser = await db.user.findUnique({ where: { username } });
//   if (existingUser) throw new Error("User already exists");
//   return db.user.create({
//     data: { username: username, password }
//   });
// }

// export function getSession() {
//   return useSession({
//     password: process.env.SESSION_SECRET ?? "areallylongsecretthatyoushouldreplace"
//   });
// }
