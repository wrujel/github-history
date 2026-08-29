import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],
    environment: 'node',
    // main.spec.ts imports the REAL @nestjs/core and @nestjs/swagger (via
    // importActual) to mock around them, and on a cold cache — which is every
    // CI run — resolving that graph costs far more than vitest's 5s default.
    // The whole warm suite runs in well under a second; this ceiling only ever
    // buys the first test its one-off import.
    testTimeout: 60_000,
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
