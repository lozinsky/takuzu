/// <reference types="@vercel/remix" />
/// <reference types="vite/client" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly SESSION_SECRET: string;
    }
  }
}

declare module '@vercel/remix' {
  interface AppLoadContext {
    env?: {
      readonly SESSION_SECRET: string;
    };
  }
}

export {};
