import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { vercelPreset } from '@vercel/remix/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

installGlobals();

export default defineConfig({
  build: { cssMinify: true },
  plugins: [
    process.env.VITEST === 'true'
      ? null
      : remix({
          future: {
            v3_fetcherPersist: true,
            v3_relativeSplatPath: true,
            v3_throwAbortReason: true,
          },
          presets: [vercelPreset()],
        }),
    tsconfigPaths(),
  ],
  test: {
    setupFiles: ['./test/setup'],
  },
});
