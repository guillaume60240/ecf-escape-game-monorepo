<p align="center">
<img src="https://img.shields.io/badge/Language-TypeScript-3178c6.svg?style=flat-square" alt="TypeScript" />
<img src="https://img.shields.io/badge/Framework-VueJs-e023e.svg?style=flat-square" alt="VueJS" />
<img src="https://img.shields.io/badge/Framework-NestJs-00afd8.svg?style=flat-square" alt="NestJs" />
<img src="https://img.shields.io/badge/Code_style-prettier-ff69b4.svg?style=flat-square" alt="Prettier" />
<img src="https://img.shields.io/badge/Ionic-3880ff.svg?style=flat-square" alt="Ionic" />
<img src="https://img.shields.io/badge/Capacitor-1E90FF.svg?style=flat-square" alt="Capacitor" />
<img src="https://img.shields.io/badge/Electron-87CEFA.svg?style=flat-square" alt="Electron" />
</p>

## Here is the monorepo for the escape game ECF 2023

### web-app

- To release
  On Github make a release with tag `web-app-*`
- url: https://ecf-escape-game-web-app-docker-bfaitf4hkq-od.a.run.app

### mobile app:

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
