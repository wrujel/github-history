import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.(t|j)s'],
      thresholds: {
        lines: 100,
        functions: 100,
        statements: 100,
        // v8 counts branches inside the decorator helpers oxc injects for
        // @Controller()/@Injectable() — their else paths are unreachable by
        // design. istanbul (which ignored them) can't parse decorators, so
        // 90% is the honest ceiling here; every real source branch is covered.
        branches: 90,
      },
    },
  },
});
