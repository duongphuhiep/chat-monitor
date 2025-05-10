import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  getGreeting: defineAction({
    input: z.object({
      yourname: z
        .string()
        .min(1, 'Name is required')
        .max(10, 'Name is too long'),
    }),
    handler: async (input) => {
      console.log('getGreeting', input);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (input.yourname == 'test') {
        throw new Error('test is blacklisted');
      }
      return `Hello, ${input.yourname}!`;
    },
  }),
};
