/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

const userUrl = 'https://api.github.com/users';
const reposUrl = 'https://api.github.com/repos';

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}

  getUser(user: string): Promise<any> {
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
    return lastValueFrom(
      this.http.get<any>(`${reposUrl}/${user}/${repo}/branches`).pipe(
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
    return lastValueFrom(
      this.http
        .get<any>(`${reposUrl}/${user}/${repo}/commits?sha=${branch}`)
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
