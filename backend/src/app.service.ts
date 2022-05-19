import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private http: HttpService, private env: ConfigService) {}

  getUser(user: string): Promise<any> {
    const userUrl = this.env.get<string>('API_USERS');
    return lastValueFrom(
      this.http.get<any>(`${userUrl}/${user}`).pipe(
        map((res) => res.data),
        map((data) => ({
          name: data.name,
          avatar_url: data.avatar_url,
          html_url: data.html_url,
        })),
      ),
    );
  }

  getRepos(user: string): Promise<any> {
    const userUrl = this.env.get<string>('API_USERS');
    return lastValueFrom(
      this.http.get<any>(`${userUrl}/${user}/repos`).pipe(
        map((res) => res.data),
        map((repos) => ({
          repos: repos.map((repo) => {
            return repo['name'];
          }),
        })),
      ),
    );
  }

  getBranches(user: string, repo: string): Promise<any> {
    const branchUrl = this.env.get<string>('API_REPOS');
    return lastValueFrom(
      this.http.get<any>(`${branchUrl}/${user}/${repo}/branches`).pipe(
        map((res) => res.data),
        map((branches) => ({
          branches: branches.map((branch) => {
            return branch['name'];
          }),
        })),
      ),
    );
  }

  getCommits(user: string, repo: string, branch: string): Promise<any> {
    const commitUrl = this.env.get<string>('API_REPOS');
    return lastValueFrom(
      this.http
        .get<any>(`${commitUrl}/${user}/${repo}/commits?sha=${branch}`)
        .pipe(
          map((res) => res.data),
          map((commits) => ({
            commits: commits.map((commit) => {
              return {
                sha: commit['sha'].slice(0, 7),
                author: commit['commit'].author.name,
                date: commit['commit'].author.date,
                message: commit['commit'].message,
              };
            }),
          })),
        ),
    );
  }
}
