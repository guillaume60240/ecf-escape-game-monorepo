<p align="center">
<img src="https://img.shields.io/badge/Language-TypeScript-3178c6.svg?style=flat-square" alt="TypeScript" />
<img src="https://img.shields.io/badge/Framework-VueJs-e023e.svg?style=flat-square" alt="VueJS" />
<img src="https://img.shields.io/badge/Framework-NestJs-00afd8.svg?style=flat-square" alt="NestJs" />
<img src="https://img.shields.io/badge/Code_style-prettier-ff69b4.svg?style=flat-square" alt="Prettier" />
<img src="https://img.shields.io/badge/Ionic-3880ff.svg?style=flat-square" alt="Ionic" />
<img src="https://img.shields.io/badge/Capacitor-1E90FF.svg?style=flat-square" alt="Capacitor" />
<img src="https://img.shields.io/badge/Electron-87CEFA.svg?style=flat-square" alt="Electron" />
</p>

# Here is the monorepo for the escape game ECF 2023

### web-app

- To release
  On Github make a release with tag `web-app-*`
- url: ~~https://ecf-escape-game-web-app-docker-bfaitf4hkq-od.a.run.app~~ (dead link)

### mobile-app:

- to build

```
cd apps/mobile-app
npm run build:all
npm run copy:all
```

- to release
  On Github make a release with tag `android-*` && with tag `desktop-*`
  Files are availables to

  - for the mobile-app : https://github.com/guillaume60240/ecf-escape-game-monorepo/actions/workflows/release-mobile-app.yml
  - for the desktop-app: https://github.com/guillaume60240/ecf-escape-game-monorepo/actions/workflows/release-desktop-app.yml

  Select the last actions to dowload artifact

### back-end api

- To release
  On Github make a release with tag `back-end-api-*`
- swagger: ~~https://ecf-escape-game-back-end-api-bfaitf4hkq-od.a.run.app/api~~ (dead link)

## To run in Docker

run `docker compose up -d`
it will create a `web-app`, a `mobile-app`, a `back-end-api` and a PostGres instance with somme data.

- web-app = http://localhost:8081
  user: studi@mail.fr
  password: test
- mobile-app = http://localhost:8080 (use browser inspector to emulate mobile or desktop environment)
  user: tino
  password: test
- swagger = http://localhost:8082/api
- admin = http://localhost:8082/admin
  user: admin@example.com
  password: password
- pg-admin = http://localhost:5050
- postgres = http://localhost:5432 (db: escape_game_postgres, user: postgres, password: password)

> #### Note:
>
> Run **web-app** and **back-end-api** with option 2 will be faster than option 1
> :fire: In this case web-app send HTTP request to API in production. :fire:
> So, the best configutaion is:
> back-end-api: option 2 (to run the latest image available)
> web-app: option 1 (to build code and expose it)
> **This is the default configuration**
