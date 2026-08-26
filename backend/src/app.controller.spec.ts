import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/**
 * These tests used to call api.github.com for real.
 *
 * That made them fail for reasons unrelated to this code: unauthenticated
 * GitHub allows 60 requests per hour PER IP, and CI runners share hot ones, so
 * a green suite depended on the runner's luck. It also meant the assertions
 * were about GitHub's data — "is Wilfredo Rujel still my name", "does
 * makeitevent still begin with Initial commit" — rather than about anything
 * this repository can get wrong.
 *
 * So HttpService is stubbed and the assertions moved to what AppService
 * actually does: reshape GitHub's payloads into this API's own contract. The
 * suite is now offline, deterministic and instant, and it tests the mapping,
 * which is the part that can actually break.
 */

/** Only the fields the service reads, so a fixture edit is a deliberate
 *  statement about the contract rather than a copied blob. */
const USER = {
  name: 'Wilfredo Rujel',
  avatar_url: 'https://avatars.example/u.png',
  html_url: 'https://github.com/wrujel',
  // present on purpose, and deliberately NOT mapped through
  bio: 'should not leak into the response',
};

const REPOS = [{ name: 'github-history' }, { name: 'makeitevent' }];

const BRANCHES = [{ name: 'main' }, { name: 'develop' }];

const COMMITS = [
  {
    sha: 'abcdef1234567890',
    html_url: 'https://github.com/wrujel/makeitevent/commit/abcdef1',
    commit: {
      message: 'Latest work',
      author: { date: '2024-02-01T00:00:00Z' },
    },
    author: {
      login: 'wrujel',
      avatar_url: 'https://avatars.example/w.png',
      html_url: 'https://github.com/wrujel',
    },
  },
  {
    sha: '1234567abcdef890',
    html_url: 'https://github.com/wrujel/makeitevent/commit/1234567',
    commit: {
      message: 'Initial commit',
      author: { date: '2024-01-01T00:00:00Z' },
    },
    // a commit whose email matched no GitHub account — the service has a branch
    // for it, and the live tests could never reach it on demand
    author: null,
  },
];

/** Routes a request to its fixture by URL shape, the way the real API does. */
function payloadFor(url: string): unknown {
  if (url.includes('/branches')) return BRANCHES;
  if (url.includes('/commits')) return COMMITS;
  if (url.endsWith('/repos')) return REPOS;
  return USER;
}

describe('AppController', () => {
  let appController: AppController;
  let requested: string[];

  beforeEach(async () => {
    requested = [];
    const http = {
      get: (url: string) => {
        requested.push(url);
        return of({ data: payloadFor(url) });
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, { provide: HttpService, useValue: http }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('serverStatus should return "Ok"', () => {
      expect(appController.getStatus().serverStatus).toBe('Ok');
    });

    it('reports the package metadata alongside it', () => {
      const status = appController.getStatus();
      expect(status.version).toBeDefined();
      expect(status.name).toBeDefined();
    });
  });

  describe('api/user', () => {
    it('should return user.name', async () => {
      const res = await appController.getUserData('wrujel');
      expect(res.name).toBe('Wilfredo Rujel');
    });

    it('maps only the three fields the client needs', async () => {
      // the endpoint is a NARROWING of GitHub's payload, not a proxy of it
      const res = await appController.getUserData('wrujel');
      expect(Object.keys(res).sort()).toEqual([
        'avatar_url',
        'html_url',
        'name',
      ]);
    });

    it('asks GitHub for that user', async () => {
      await appController.getUserData('wrujel');
      expect(requested[0]).toBe('https://api.github.com/users/wrujel');
    });
  });

  describe('api/repos', () => {
    it('should return repos', async () => {
      const res = await appController.getRepoData('wrujel');
      expect(res.repos).not.toBeNull();
    });

    it('flattens them to names and marks the call succeeded', async () => {
      const res = await appController.getRepoData('wrujel');
      expect(res.repos).toEqual(['github-history', 'makeitevent']);
      expect(res.info).toBe('succeed');
    });
  });

  describe('api/branches', () => {
    it('should contain branche main', async () => {
      const res = await appController.getBranchData('wrujel', 'github-history');
      expect(res.branches).toContain('main');
    });

    it('fails cleanly when a parameter is missing', async () => {
      // the controller guards BEFORE calling out — worth pinning, since the
      // alternative is a request to /repos/undefined/undefined/branches
      const res = await appController.getBranchData(undefined, 'x');
      expect(res).toEqual({ info: 'failed' });
      expect(requested).toEqual([]);
    });
  });

  describe('api/commits', () => {
    it('should contain Initial commit', async () => {
      const res = await appController.getCommitData(
        'wrujel',
        'makeitevent',
        'main',
      );
      expect(res.commits.slice(-1)[0].message).toContain('Initial commit');
    });

    it('shortens the sha and lifts the commit date', async () => {
      const res = await appController.getCommitData(
        'wrujel',
        'makeitevent',
        'main',
      );
      expect(res.commits[0].sha).toBe('abcdef1');
      expect(res.commits[0].date).toBe('2024-02-01T00:00:00Z');
    });

    it('carries the author when GitHub matched one', async () => {
      const res = await appController.getCommitData(
        'wrujel',
        'makeitevent',
        'main',
      );
      expect(res.commits[0].author).toBe('wrujel');
      expect(res.commits[0].avatar_url).toBe('https://avatars.example/w.png');
    });

    it('omits the author fields when GitHub matched none', async () => {
      // the `author === null` branch: a commit whose email belongs to no GitHub
      // account. Reaching it against the live API meant finding such a commit
      // and hoping it stayed put.
      const res = await appController.getCommitData(
        'wrujel',
        'makeitevent',
        'main',
      );
      const orphan = res.commits[1];
      expect(orphan.author).toBeUndefined();
      expect(orphan.sha).toBe('1234567');
      expect(orphan.message).toBe('Initial commit');
    });

    it('passes the branch through as the sha query', async () => {
      await appController.getCommitData('wrujel', 'makeitevent', 'develop');
      expect(requested[0]).toContain('/commits?sha=develop');
    });

    it('fails cleanly when a parameter is missing', async () => {
      expect(await appController.getCommitData('u', 'r', undefined)).toEqual({
        info: 'failed',
      });
    });
  });

  describe('api/data', () => {
    it('merges all four calls into one payload', async () => {
      const res = await appController.getData('wrujel', 'makeitevent', 'main');
      expect(res.name).toBe('Wilfredo Rujel');
      expect(res.repos).toEqual(['github-history', 'makeitevent']);
      expect(res.branches).toContain('main');
      expect(res.commits).toHaveLength(2);
      expect(res.info).toBe('succeed');
    });

    it('fails cleanly when a parameter is missing', async () => {
      expect(await appController.getData('u', undefined, 'main')).toEqual({
        info: 'failed',
      });
    });
  });
});
