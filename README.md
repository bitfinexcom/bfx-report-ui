# bfx-report-ui

The frontend of bfx-report at https://report.bitfinex.com

You can download the standalone electron version at [bfx-report-electron](https://github.com/bitfinexcom/bfx-report-electron)

Check `docs/` folder for more details.

## Instructions (For development)

Refer the first 2 steps from `bfx-report` project.

1. Clone `bfx-report` project and do npm install.

```
git clone https://github.com/bitfinexcom/bfx-report.git
npm install
```

If you have installed `bfx-report` before, you might need to clean the npm cache to get the latest dependecy modules.

```
npm cache clean --force
npm install
```

1.1. Copy all `config/**/*.json.example` to `config/**/*.json`

1.2. Run the grenache worker with commands

manually run the 3 servers (in different terminal)

    ```
    grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
    grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
    npm run start
    ```

If grape command is not available, install  `grenache-grape` globally via

    `npm i -g grenache-grape`

2. Clone `bfx-report-ui` project

    ```
    git clone https://github.com/bitfinexcom/bfx-report-ui.git
    cd bfx-report-ui
    npm install
    ```

2.1. Pull up the `bfx-report-express` submodule last changes and do npm install

```
git submodule sync
git submodule update --init --recursive
git pull --recurse-submodules
git submodule update --remote
cd bfx-report-express
npm install
```

2.1.1. Copy all `config/**/*.json.example` to `config/**/*.json`

2.1.2. Run the express server with commands

```
npm run start
```

2.2. back to `bfx-report-ui` root, set up env variables to run locally:

    ```
    export REACT_APP_PLATFORM=localhost
    ```

`REACT_APP_PLATFORM` is used to select the right set for site title, api endpoint and more configs.

2.3. start the report-ui

    ```
    npm run start
    ```

Make sure you have access permission to test with the staging server/API.

## Web Token authentication

Web Token authentication will be used for site `https://report.bitfinex.com`.

To test web token authentication locally,

1. Visit `https://www.bitfinex.com`, login and open web console, type `window.WSTOKEN` to copy the authToken.

2. Start server locally via `npm start` and visit `http://localhost:3000/?authToken=pub:api:<token string>`, you'll auto login without enter auth secret and key.

The hosted version of report (https://report.bitfinex.com) will not allow access via API keys (for security reasons)

https://report.bitfinex.com will be only accessible starting from https://www.bitfinex.com/report that will redirect the user to https://report.bitfinex.com/?authToken=pub:api:<token string>

## Offline Query Mode (Sync Mode)

Bfx-report support sync user data to local machine and query offline. To enable that you need
1. set `"syncMode": true` in bfx-report/config/service.report.json
2. set `showSyncMode: true,` in bfx-report-ui/src/var/config.js

Then run `npm start` and you will see the extra sync status button at top right side of the header.

## Configure for Ethfinex

1. set `export REACT_APP_PLATFORM=ethfinex` in env variables instead

You'll be noticed `hideSwitchTheme` is set to true in `var/config.js` because Ethfinex does not have dark/light theming.

Also need to set up related env variables:

```
NODE_PATH=src/
PUBLIC_URL=/
REACT_APP_PLATFORM=ethfinex
REACT_APP_TITLE=Ethfinex Reports
REACT_APP_LOGO_PATH=favicon.png
```

We can custom what files need to copy into the project through edit the `scripts/copyFiles` script.

## 3rd party libraries

* react/redux/redux-saga for core architecture
* [re-ducks](https://github.com/alexnm/re-ducks)-like state structure
* blueprintjs for ui framework http://blueprintjs.com
* flexboxgrid2 for layout http://flexboxgrid.com/
* [redux-persist] for local storage selected state
