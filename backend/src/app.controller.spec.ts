import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('serverStatus should return "Ok"', () => {
      expect(appController.getStatus().serverStatus).toBe('Ok');
    });
  });

  describe('api/user', () => {
    it('should return user.name', async () => {
      const res = await appController.getUserData('wrujel');
      expect(res.name).toBe('Wilfredo Rujel');
    });
  });

  describe('api/repos', () => {
    it('should return repos', async () => {
      const res = await appController.getRepoData('wrujel');
      expect(res.repos).not.toBeNull();
    });
  });

  describe('api/branches', () => {
    it('should contain branche main', async () => {
      const res = await appController.getBranchData('wrujel', 'github-history');
      expect(res.branches).toContain('main');
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
  });
});
