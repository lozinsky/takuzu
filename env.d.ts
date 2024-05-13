/// <reference types="@vercel/remix" />
/// <reference types="vite/client" />
/// <reference types="@remix-run/react/future/single-fetch.d.ts" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly SESSION_SECRET: string;
    }
  }
}

export {};
