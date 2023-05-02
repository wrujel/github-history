<div align="center">
  <h1>Github History App</h1>
</div>

<div align="center">
  <a href="/README.md">
    <img 
      src="https://img.shields.io/badge/Status-Complete-success.svg" 
      alt="Status" 
    />
  </a>
  <a href="/package.json">
    <img 
      src="https://img.shields.io/badge/Version-2.0.0-blue.svg" 
      alt="Version" 
    />
  </a>
  <a href="/LICENSE">
    <img 
      src="https://img.shields.io/badge/License-MIT-green.svg" 
      alt="License" 
    />
  </a>
  <a href="https://vercel.com/">
    <img
      src="https://img.shields.io/badge/vercel-Deployed-success.svg?style=flat&logo=vercel"
      alt="Deployed on Vercel"
    />
  </a>
  <a href="https://nextjs.org/">
    <img 
      src="https://img.shields.io/badge/Next.js-12.0.0+-blue.svg?style=flat&logo=next.js" 
      alt="Next.js version" 
    />
  </a>
  <a href="https://nestjs.com/">
    <img 
      src="https://img.shields.io/badge/NestJS-8.0.0+-blue.svg?style=flat&logo=nestjs" 
      alt="NestJS version" 
    />
  </a>
  <a href="https://nodejs.org/">
    <img 
      src="https://img.shields.io/badge/Node.js-16.15.0+-blue.svg?style=flat&logo=node.js" 
      alt="Node.js version" 
    />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img 
      src="https://img.shields.io/badge/Typescript-4.4.4+-blue.svg?style=flat&logo=typescript" 
      alt="Typescript version" 
    />
  </a>
  <a href="https://tailwindcss.com/">
    <img 
      src="https://img.shields.io/badge/Tailwindcss-2.2.17+-blue.svg?style=flat&logo=tailwindcss" 
      alt="Tailwindcss version" 
    />
  </a>
  <a href="https://jestjs.io/">
    <img 
      src="https://img.shields.io/badge/Jest-27.2.5+-blue.svg?style=flat&logo=jest" 
      alt="Jest version" 
    />
  </a>
  <a href="https://reactjs.org/">
    <img 
      src="https://img.shields.io/badge/React-17.0.2+-blue.svg?style=flat&logo=react" 
      alt="React version" 
    />
  </a>
  <a href="https://docs.github.com/en/rest">
    <img 
      src="https://img.shields.io/badge/Github%20API-Complete-blue.svg?style=flat&logo=github" 
      alt="Github API version" 
    />
  </a>
  <a href="https://date-fns.org/">
    <img 
      src="https://img.shields.io/badge/Date--fns-2.25.0+-blue.svg?style=flat&logo=date-fns" 
      alt="Date-fns version" 
    />
  </a>
  <a href="https://swagger.io/">
    <img 
      src="https://img.shields.io/badge/Swagger-4.4.0+-blue.svg?style=flat&logo=swagger" 
      alt="Swagger version" 
    />
  </a>

</div>
<br />

This app will show you a list of all commits of a github repository. You can search by username, select the repository and branch you want to search and it will show you a list of all commits respectively.

# Table of Contents
- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Cloning the repository](#cloning-the-repository)
  - [Setup Backend](#setup-backend)
    - [Installation](#installation)
    - [Running server](#running-server)
    - [Documentation](#documentation)
    - [Test](#test)
  - [Setup Frontend](#setup-frontend)
    - [Installation](#installation-1)
    - [Running client](#running-client)
- [Try Demo](#try-demo)
  
# Features
- [x] Show a list of all repositories of a Github user.
- [x] Show a list of all branches of a Github repository.
- [x] Show a list of all commits of a Github repository.
- [x] Use Github API to get data of commits, repositories, branches, etc.
- [x] Backend was developed with NestJS to create a REST API.
- [x] REST API was documented with Swagger.
- [x] Frontend was developed with NextJS and consume data from backend.
- [x] Frontend use Tailwind, a custom css loader and a dark theme.
- [x] Build and deploy with Vercel.
- [x] Typescript was used in backend and frontend. 

# Tech Stack
- [NestJS](https://nestjs.com/)
- [NextJS](https://nextjs.org/)
- [NodeJS](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/)
- [React](https://reactjs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Vercel](https://vercel.com/) 
- [Github API](https://docs.github.com/en/rest)
- [Date-fns](https://date-fns.org/) 
          
# Getting Started
This is a mono repository project that is divided in two parts, the backend and the frontend. The backend is developed with [NestJS](https://nestjs.com/) and the frontend with [NextJS](https://nextjs.org/).

## Cloning the repository
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

## Setup Backend
Type the following command:
```
cd github-history/backend
```

### Installation
Install all dependencies, you need  to have installed [nodejs](https://nodejs.org/) version 16.15.0.  
```bash
npm install
```

### Running server
Commands to run backend server, use `start:dev` if you want to automatically reset server after saving changes.
```bash
# development
npm run start

# watch mode
npm run start:dev
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
npm run test

# e2e tests
npm run test:e2e
```

## Setup Frontend 
In the root of project, type the following command:
```
cd github-history/frontend
```

### Installation
Install all dependencies, you need  to have installed [nodejs](https://nodejs.org/) version 16.15.0.  
```bash
npm install
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
The project is deployed with Vercel. Open this link with your browser to see demo. https://github-history.vercel.app/
