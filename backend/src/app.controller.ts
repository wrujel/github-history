import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as info from '../package.json';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus() {
    return {
      serverStatus: 'Ok',
      version: info.version,
      name: info.description,
      author: info.author,
    };
  }

  @Post('api/user')
  @Header('Content-Type', 'application/json')
  public async getUserData(@Body('user') user: string): Promise<any> {
    const userData = await this.appService.getUser(user);
    return userData;
  }

  @Post('api/repos')
  @Header('Content-Type', 'application/json')
  public async getRepoData(@Body('user') user: string): Promise<any> {
    const reposData = await this.appService.getRepos(user);
    return reposData;
  }

  @Post('api/branches')
  @Header('Content-Type', 'application/json')
  public async getBranchData(
    @Body('user') user: string,
    @Body('repo') repo: string,
  ): Promise<any> {
    const branchesData = await this.appService.getBranches(user, repo);
    return branchesData;
  }

  @Post('api/commits')
  @Header('Content-Type', 'application/json')
  public async getCommitData(
    @Body('user') user: string,
    @Body('repo') repo: string,
    @Body('branch') branch: string,
  ): Promise<any> {
    const commitsData = await this.appService.getCommits(user, repo, branch);
    return commitsData;
  }

  @Post('api/data')
  @Header('Content-Type', 'application/json')
  public async getData(
    @Body('user') user: string,
    @Body('repo') repo: string,
    @Body('branch') branch: string,
  ): Promise<any> {
    const userData = await this.appService.getUser(user);
    const reposData = await this.appService.getRepos(user);
    const branchesData = await this.appService.getBranches(user, repo);
    const commitsData = await this.appService.getCommits(user, repo, branch);
    return { ...userData, ...reposData, ...branchesData, ...commitsData };
  }
}
