/**
 * main.ts runs bootstrap() the moment it is imported, which is why the unit
 * suite never covered it: importing it for real would start an HTTP server on
 * a port. Here NestFactory and the Swagger document builder are mocked, so
 * importing main exercises the real bootstrap wiring — app creation with cors,
 * Swagger setup, port selection, the startup log — against a fake app whose
 * listen() resolves immediately.
 *
 * PORT is read once at import time, so each test boots main in a fresh module
 * registry (vi.resetModules) to give it its own environment. The mocks live in
 * vi.hoisted so every re-evaluation of the module factory hands main the SAME
 * instances the test configured.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  // main.ts calls `new DocumentBuilder()` — vitest really constructs mocks, so
  // an arrow-function implementation would die with "is not a constructor".
  class FakeDocumentBuilder {
    setTitle() {
      return this;
    }
    setDescription() {
      return this;
    }
    setVersion() {
      return this;
    }
    build() {
      return 'swagger-config';
    }
  }
  return {
    create: vi.fn(),
    setup: vi.fn(),
    createDocument: vi.fn().mockReturnValue('swagger-document'),
    FakeDocumentBuilder,
  };
});

vi.mock('@nestjs/core', async () => ({
  ...((await vi.importActual('@nestjs/core')) as object),
  NestFactory: { create: mocks.create },
}));

vi.mock('@nestjs/swagger', async () => ({
  ...((await vi.importActual('@nestjs/swagger')) as object),
  DocumentBuilder: mocks.FakeDocumentBuilder,
  SwaggerModule: {
    createDocument: mocks.createDocument,
    setup: mocks.setup,
  },
}));

/** Lets bootstrap()'s awaited promises (create, listen) play out. */
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

/** Imports main with fresh modules and returns the spies bootstrap acted on. */
async function boot() {
  vi.resetModules();
  vi.clearAllMocks();

  const listen = vi.fn<() => Promise<void>>().mockResolvedValue(undefined);
  mocks.create.mockResolvedValue({ listen });

  const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

  await import('./main');
  await flushPromises();

  return { create: mocks.create, listen, log, setup: mocks.setup };
}

describe('main bootstrap', () => {
  const ORIGINAL_PORT = process.env.PORT;

  afterEach(() => {
    vi.restoreAllMocks();
    if (ORIGINAL_PORT === undefined) {
      delete process.env.PORT;
    } else {
      process.env.PORT = ORIGINAL_PORT;
    }
  });

  it('listens on 8080 when PORT is not set', async () => {
    delete process.env.PORT;
    const { listen, log } = await boot();
    expect(listen).toHaveBeenCalledTimes(1);
    expect(listen).toHaveBeenCalledWith(8080);
    expect(log).toHaveBeenCalledWith('Server running on port 8080');
  });

  it('listens on the PORT from the environment when set', async () => {
    process.env.PORT = '3001';
    const { listen, log } = await boot();
    expect(listen).toHaveBeenCalledWith('3001');
    expect(log).toHaveBeenCalledWith('Server running on port 3001');
  });

  it('creates the app with cors and publishes the Swagger docs', async () => {
    delete process.env.PORT;
    const { create, setup } = await boot();
    expect(create).toHaveBeenCalledWith(expect.any(Function), { cors: true });
    expect(setup).toHaveBeenCalledWith(
      'api/docs',
      expect.anything(),
      'swagger-document',
      { swaggerOptions: { showRequestDuration: true } },
    );
  });
});
