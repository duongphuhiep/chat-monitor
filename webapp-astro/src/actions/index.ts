import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getCookie } from "../lib/auth";
import { createSupabaseAnon } from "../lib/supabase";
import type { Conversation } from "../lib/types";

export const server = {
  getGreeting: defineAction({
    input: z.object({
      yourname: z
        .string()
        .min(1, "Name is required")
        .max(10, "Name is too long"),
    }),
    handler: async (input: { yourname: string }) => {
      console.log("getGreeting", input);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (input.yourname == "test") {
        throw new Error("test is blacklisted");
      }
      return `Hello, ${input.yourname}!`;
    },
  }),

  queryConversationList: defineAction({
    handler: async (_input, ctx) => {
      const appCookie = getCookie(ctx);
      if (!appCookie?.access_token) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "User must be logged in.",
        });
      }
      const supabaseAnon = createSupabaseAnon();

      const { data: sessionData, error: sessionError } =
        await supabaseAnon.auth.setSession({
          access_token: appCookie.access_token!,
          refresh_token: appCookie.refresh_token!,
        });

      if (sessionError) {
        console.error(
          "🚀 ~ queryConversationList ~ sessionError:",
          sessionError,
        );
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: sessionError.message,
        });
      }

      if (sessionData.user?.id != appCookie.user_id) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Security breach! session, and cookie data doesn't match",
        });
      }

      const { data, error } = await supabaseAnon.rpc("get_conversations", {
        participant_user_id: appCookie.user_id,
      });
      if (error) {
        console.error("🚀 ~ queryConversationList ~ error:", error);
        throw error;
      }
      return data as Conversation[];
    },
  }),
};
