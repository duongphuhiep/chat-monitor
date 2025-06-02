export const logger = {
  info: (message: string, ...args: unknown[]) => {
    if (import.meta.env.DEV || import.meta.env.SSR) {
      console.info(`[${new Date().toISOString()}]`, message, ...args);
    }
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(`[${new Date().toISOString()}]`, message, ...args);
  },
};
