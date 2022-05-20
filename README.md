<div align="center">
  <h1>Github History App</h1>
</div>

<br />

<div align="center">
    <a href="https://nestjs.com/">
        <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white&style=flat" alt="nestjs" />
    </a>
    <a href="https://nextjs.org/">
        <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white&style=flat" alt="nextjs" />
    </a>
    <a href="https://nodejs.org/">
        <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white&style=flat&logo=appveyor" alt="typecript" />
    </a>
    <a href="https://www.typescriptlang.org/">
        <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&style=flat&logo=appveyor" alt="typecript" />
    </a>
    <a href="https://github.com/wrujel/github-history/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/nestjsx/crud.svg" alt="License" />
    </a>
</div>

<br />

This app will will show you a list of all commits of a github repository. You can search by username, select the repository and branch you want to search and it will show you a list of all commits respectively. 

# Getting Started

## Cloning the repository
### On Windows
Open a command prompt, and copy the following command, you need to have installed [git](https://git-scm.com/).
```
git clone https://github.com/wrujel/github-history.git
```
Press Enter to create your local clone.
```
Cloning into 'github-history'...
remote: Enumerating objects: 138, done.
remote: Counting objects: 100% (138/138), done.
remote: Compressing objects: 100% (84/84), done.
remote: Total 138 (delta 54), reused 130 (delta 50), pack-reused 0 eceiving objects:  83%
Receiving objects: 100% (138/138), 230.03 KiB | 747.00 KiB/s, done.
Resolving deltas: 100% (54/54), done.
```
## Setup server
Type the following command:
```
cd github-history/backend
```

### Installation
Install all dependencies, you need  to have installed [nodejs](https://nodejs.org/) version 16.15.0.  
```bash
$ npm install
```
### Running server
Commands to run backend server, use `start:dev` if you want to automatically reset server after saving changes.
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
The server will start running.

```
[Nest] LOG [NestApplication] Nest application successfully started 
Server running on port 8080
```
Open your browser and copy following url to see result:
```
http://localhost:8080/
```
### Documentation
You can visit following path to see documentation generated with swagger:
```
http://localhost:8080/api/docs
```
### Test
Commands to test server.
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Setup client 
In the root of project, type the following command:
```
cd github-history/frontend
```
### Installation
Install all dependencies, you need  to have installed [nodejs](https://nodejs.org/) version 16.15.0.  
```bash
$ npm install
```
### Running client
Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Try Demo

Open link with your browser to see demo.
