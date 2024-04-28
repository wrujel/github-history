[demo]: https://img.shields.io/badge/🚀%20Live%20Demo-000000?style=for-the-badge&&logoColor=white&color=0a6bdb
[status-link]: https://github.com/wrujel/monitor-repos
[tests-link]: https://github.com/wrujel/monitor-tests

[demo-link]: https://github-history.vercel.app/
[status]: https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fwrujel%2Fmonitor-repos%2Fmain%2Fdata%2Fgithub-history.json
[deploy]: https://img.shields.io/github/deployments/wrujel/github-history/production?style=for-the-badge&label=Deploy
[tests]: https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fwrujel%2Fmonitor-tests%2Fmain%2Fdata%2Fgithub-history.json

<div align='center'>

  [![demo][demo]][demo-link]
  [![status][status]][status-link]
  [![deploy][deploy]](/)
  [![test][tests]][tests-link]

</div>

<div align='center'>
  <a href='/'>
    <img
      src='/frontend/public/screenshot.png'
      alt='Screenshot of the app'
      width='80%'
    />
  </a>
</div>

<div align="center">
  <h1>Github History App</h1>
</div>

<div align="center">
  
  [![Next.js][nextjs]][nextjs-link]
  [![Typescript][typescript]][typescript-link]
  [![Tailwind CSS][tailwindcss]][tailwindcss-link]
  [![React][react]][react-link]
  [![Github API][github-api]][github-api-link]
  [![Date-fns][date-fns]][date-fns-link]
  [![React-Hot-Toast][react-hot-toast]][react-hot-toast-link]
  [![Vercel][vercel]][vercel-link]
  [![Node.js][nodejs]][nodejs-link]
  [![NestJS][netsjs]][netsjs-link]
  [![Swagger][swagger]][swagger-link]
  [![Jest][jest]][jest-link]

</div>

<div align='center'>
  This app will show you a list of all commits of a github repository. You can search by username, select the repository and branch you want to search and it will show you a list of all commits respectively.

  [Demo](https://github-history.vercel.app/) · [Report issue](/issues) · [Suggest something](/issues)
</div>

## Table of Contents
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
  
## Features
- [x] Show a list of all repositories of a Github user.
- [x] Show a list of all branches of a Github repository.
- [x] Show a list of all commits of a Github repository.
- [x] Use Github API to get data of commits, repositories, branches, etc.
- [x] Backend was developed with NestJS to create a REST API.
- [x] REST API was documented with Swagger.
- [x] Frontend was developed with NextJS and consume data from backend.
- [x] Frontend use Tailwind, a custom css loader and a dark theme.
- [x] Frontend deployed with Vercel.
- [x] Backend deployed with Railway.
- [x] Typescript was used in backend and frontend. 
- [x] Use React-Hot-Toast to show notification messages.

## Tech Stack
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
- [Railway](https://railway.app/)
- [React-Hot-Toast](https://react-hot-toast.com/)
          
## Getting Started
This is a mono repository project that is divided in two parts, the backend and the frontend. The backend is developed with [NestJS](https://nestjs.com/) and the frontend with [NextJS](https://nextjs.org/).

### Cloning the repository
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

### Setup Backend
Type the following command:
```
cd github-history/backend
```

#### Installation
Install all dependencies, you need  to have installed [nodejs](https://nodejs.org/) version 16.15.0.  
```bash
npm install
```

#### Running server
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

#### Documentation
You can visit following path to see documentation generated with swagger:
```
http://localhost:8080/api/docs
```

#### Test
Commands to test server.
```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

### Setup Frontend 
In the root of project, type the following command:
```
cd github-history/frontend
```

#### Installation
Install all dependencies, you need  to have installed [nodejs](https://nodejs.org/) version 16.15.0.  
```bash
npm install
```

#### Running client
Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Try Demo
The project is deployed with Vercel. Open this link with your browser to see demo:

[![demo][demo]][demo-link]


<!-- Badges -->
[nextjs]: https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js
[typescript]: https://img.shields.io/badge/Typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&color=blue
[tailwindcss]: https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[lodash]: https://img.shields.io/badge/Lodash-2A2A2A?style=for-the-badge&logo=lodash
[next-auth]: https://img.shields.io/badge/Next--Auth-black?style=for-the-badge&logo=next.js
[prisma]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[axios]: https://img.shields.io/badge/Axios-671ddf?style=for-the-badge&logo=axios&logoColor=white
[react-icons]: https://img.shields.io/badge/React--Icons-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[swr]: https://img.shields.io/badge/SWR-black?style=for-the-badge&logo=next.js
[zustand]: https://img.shields.io/badge/Zustand-2A2A2A?style=for-the-badge&logo=npm
[react-player]: https://img.shields.io/badge/React--Player-2A2A2A?style=for-the-badge&logo=npm
[mongodb]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[html]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[css]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[javascript]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[netlify]: https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white
[vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[astro]: https://img.shields.io/badge/Astro-0C1222?style=for-the-badge&logo=astro&logoColor=FDFDFE
[express]: https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white
[mongoose]: https://img.shields.io/badge/Mongoose-2A2A2A?style=for-the-badge&logo=mongoose&logoColor=white
[angular]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-material]: https://img.shields.io/badge/Angular%20Material-DD0031?style=for-the-badge&logo=angular&logoColor=white
[nodejs]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[netsjs]: https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
[swagger]: https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black
[jest]: https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white
[react-hot-toast]: https://img.shields.io/badge/React--Hot--Toast-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[github-api]: https://img.shields.io/badge/Github%20API-181717?style=for-the-badge&logo=github&logoColor=white
[date-fns]: https://img.shields.io/badge/Date--fns-F7841B?style=for-the-badge&logo=date-fns&logoColor=white
[django]: https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green
[django-rest-framework]: https://img.shields.io/badge/django%20rest-ff1709?style=for-the-badge&logo=django&logoColor=white
[coreapi]: https://img.shields.io/badge/Coreapi-2A2A2A.svg?style=for-the-badge&logo=coreapi
[bcrypt]: https://img.shields.io/badge/Bcrypt-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[recharts]: https://img.shields.io/badge/Recharts-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[use-debounce]: https://img.shields.io/badge/Use--Debounce-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[framer-motion]: https://img.shields.io/badge/Framer%20Motion-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[tsparticles]: https://img.shields.io/badge/Tsparticles-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[swiper]: https://img.shields.io/badge/Swiper-6332D2?style=for-the-badge&logo=swiper&logoColor=white
[react-countup]: https://img.shields.io/badge/React%20Countup-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[cloudinary]: https://img.shields.io/badge/Cloudinary-4285F4?style=for-the-badge&logo=cloudinary&logoColor=white
[query-string]: https://img.shields.io/badge/Query%20String-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[react-date-range]: https://img.shields.io/badge/React%20Date%20Range-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[react-hook-form]: https://img.shields.io/badge/React%20Hook%20Form-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-spinners]: https://img.shields.io/badge/React%20spinners-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[world-countries-data]: https://img.shields.io/badge/World%20countries%20data-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[react-leaflet]: https://img.shields.io/badge/React%20Leaflet-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[react-select]: https://img.shields.io/badge/React%20Select-2A2A2A?style=for-the-badge&logo=npm&logoColor=white

<!-- Badges links -->
[nextjs-link]: https://nextjs.org/
[typescript-link]: https://www.typescriptlang.org/
[tailwindcss-link]: https://tailwindcss.com/
[react-link]: https://reactjs.org/
[lodash-link]: https://lodash.com/
[next-auth-link]: https://next-auth.js.org/
[prisma-link]: https://www.prisma.io/
[axios-link]: https://axios-http.com/
[react-icons-link]: https://react-icons.github.io/react-icons/
[swr-link]: https://swr.vercel.app/
[zustand-link]: https://zustand.surge.sh/
[react-player-link]: https://www.npmjs.com/package/react-player
[mongodb-link]: https://www.mongodb.com/
[vercel-link]: https://vercel.com/
[html-link]: https://developer.mozilla.org/en-US/docs/Web/HTML
[css-link]: https://developer.mozilla.org/en-US/docs/Web/CSS
[javascript-link]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[netlify-link]: https://www.netlify.com/
[vite-link]: https://vitejs.dev/
[astro-link]: https://astro.build/
[express-link]: https://expressjs.com/
[mongoose-link]: https://mongoosejs.com/
[angular-link]: https://angular.io/
[angular-material-link]: https://material.angular.io/
[nodejs-link]: https://nodejs.org/en/
[netsjs-link]: https://nestjs.com/
[swagger-link]: https://swagger.io/
[jest-link]: https://jestjs.io/
[react-hot-toast-link]: https://react-hot-toast.com/
[github-api-link]: https://docs.github.com/en/rest
[date-fns-link]: https://date-fns.org/
