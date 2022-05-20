import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as info from '../package.json';
import { RequestBranch, RequestCommit, RequestUser } from './models/api.models';
import { ApiBody, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ description: 'Server status' })
  getStatus() {
    return {
      serverStatus: 'Ok',
      version: info.version,
      name: info.description,
      author: info.author,
    };
  }

  @Post('api/user')
  @ApiOkResponse({ description: 'User data' })
  @ApiNotFoundResponse({ description: 'Invalid parameters' })
  @ApiBody({ type: RequestUser })
  @Header('Content-Type', 'application/json')
  public async getUserData(@Body('user') user: string): Promise<any> {
    const userData = await this.appService.getUser(user);
    return userData;
  }

  @Post('api/repos')
  @ApiOkResponse({ description: 'Repositories' })
  @ApiNotFoundResponse({ description: 'Invalid parameters' })
  @ApiBody({ type: RequestUser })
  @Header('Content-Type', 'application/json')
  public async getRepoData(@Body('user') user: string): Promise<any> {
    const reposData = await this.appService.getRepos(user);
    return { ...reposData, info: 'succeed' };
  }

  @Post('api/branches')
  @ApiOkResponse({ description: 'Branches' })
  @ApiNotFoundResponse({ description: 'Invalid parameters' })
  @ApiBody({ type: RequestBranch })
  @Header('Content-Type', 'application/json')
  public async getBranchData(
    @Body('user') user: string,
    @Body('repo') repo: string,
  ): Promise<any> {
    if (user !== undefined && repo !== undefined) {
      const branchesData = await this.appService.getBranches(user, repo);
      return { ...branchesData, info: 'succeed' };
    } else {
      return { info: 'failed' };
    }
  }

  @Post('api/commits')
  @ApiOkResponse({ description: 'Commits' })
  @ApiNotFoundResponse({ description: 'Invalid parameters' })
  @ApiBody({ type: RequestCommit })
  @Header('Content-Type', 'application/json')
  public async getCommitData(
    @Body('user') user: string,
    @Body('repo') repo: string,
    @Body('branch') branch: string,
  ): Promise<any> {
    if (user !== undefined && repo !== undefined && branch !== undefined) {
      const commitsData = await this.appService.getCommits(user, repo, branch);
      return { ...commitsData, info: 'succeed' };
    } else {
      return { info: 'failed' };
    }
  }

  @Post('api/data')
  @ApiOkResponse({ description: 'All data' })
  @ApiNotFoundResponse({ description: 'Invalid parameters' })
  @ApiBody({ type: RequestCommit })
  @Header('Content-Type', 'application/json')
  public async getData(
    @Body('user') user: string,
    @Body('repo') repo: string,
    @Body('branch') branch: string,
  ): Promise<any> {
    if (user !== undefined && repo !== undefined && branch !== undefined) {
      const userData = await this.appService.getUser(user);
      const reposData = await this.appService.getRepos(user);
      const branchesData = await this.appService.getBranches(user, repo);
      const commitsData = await this.appService.getCommits(user, repo, branch);
      return {
        ...userData,
        ...reposData,
        ...branchesData,
        ...commitsData,
        info: 'succeed',
      };
    } else {
      return { info: 'failed' };
    }
  }
}
