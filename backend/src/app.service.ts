import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private http: HttpService, private env: ConfigService) {}

  bearerToken = this.env.get<string>('API_TOKEN');
  header = {
    Authorization: `Bearer ${this.bearerToken}`,
  };

  getUser(user: string): Promise<any> {
    const userUrl = 'https://api.github.com/users';
    return lastValueFrom(
      this.http.get<any>(`${userUrl}/${user}`, { headers: this.header }).pipe(
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
    const userUrl = 'https://api.github.com/users';
    return lastValueFrom(
      this.http
        .get<any>(`${userUrl}/${user}/repos`, { headers: this.header })
        .pipe(
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
    const branchUrl = 'https://api.github.com/repos';
    return lastValueFrom(
      this.http
        .get<any>(`${branchUrl}/${user}/${repo}/branches`, {
          headers: this.header,
        })
        .pipe(
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
    const commitUrl = 'https://api.github.com/repos';
    return lastValueFrom(
      this.http
        .get<any>(`${commitUrl}/${user}/${repo}/commits?sha=${branch}`, {
          headers: this.header,
        })
        .pipe(
          map((res) => res.data),
          map((commits) => ({
            commits: commits.map((commit) => {
              const response = {
                sha: commit['sha'].slice(0, 7),
                html_url: commit['html_url'],
                date: commit['commit'].author.date,
                message: commit['commit'].message,
              };
              if (commit['author'] !== null) {
                return {
                  ...response,
                  author: commit['author'].login,
                  avatar_url: commit['author'].avatar_url,
                  author_url: commit['author'].html_url,
                };
              } else {
                return response;
              }
            }),
          })),
        ),
    );
  }
}
