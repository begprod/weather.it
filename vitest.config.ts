import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  // @ts-expect-error Type 'UserConfig & Promise<UserConfig> & UserConfigFnObject' is not assignable to type 'never'.
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      // @ts-expect-error Object literal may only specify known properties, but 'transformMode' does not exist in type 'InlineConfig'. Did you mean to write 'testTransformMode'?
      transformMode: {
        web: [/\.[jt]sx$/],
      },
    },
  }),
);
