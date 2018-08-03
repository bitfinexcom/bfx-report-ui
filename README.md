# bfx-report-ui

The frontend of bfx-report at https://report.bitfinex.com

Should work with [bfx-report](https://github.com/bitfinexcom/bfx-report)

Or you can download the standalone electron version at [bfx-report-electron](https://github.com/bitfinexcom/bfx-report-electron)

## Instructions (For development)

Refer the first 2 steps from `bfx-report` project.

1. Clone `bfx-report` project and npm install.

```
git clone https://github.com/bitfinexcom/bfx-report.git
npm install
```

2. Then copy all `config/**/*.json.example` to `config/**/*.json`

3. Run a the backend with single command

```
npm run startAllDev
````

Or manually run the 4 servers (in different terminal)

```
grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
npm run startWorker
npm run start
```

If grape command is not available, install  `grenache-grape` globally via

`npm i -g grenache-grape`

4. Clone `bfx-report-ui` project

```
git clone https://github.com/bitfinexcom/bfx-report-ui.git
cd bfx-report-ui
npm install
```

5. set up env variables to run locally:

```
export NODE_PATH=src/
export PUBLIC_URL=./
export REACT_APP_PLATFORM=localhost
```

`NODE_PATH` is used to support absolute import local package instead of relative import.
`PUBLIC_URL` is used to define default import path in `public/index.html`.
`REACT_APP_PLATFORM` is used to select the right set for site title, api endpoint and more configs.

6. start the report-ui

```
npm run start
```

Make sure you have access permission to test with the staging server/API.

## Web Token authentication

Web Token authentication will be used for site `https://report.bitfinex.com`.

To test web token authentication locally,

1. Open `var/config.js` and change the value of `bitfinex.API_URL` to `http://localhost:31339/api`

2. Visit `https://www.bitfinex.com`, login and open web console, type `window.WSTOKEN` to copy the authToken.

3. Set environment variable as follow

    ```
    export REACT_APP_PLATFORM=bitfinex
    ```

4. Start server locally via `npm start` and visit `http://localhost:3000/?authToken=pub:api:<token string>`, you'll auto login without enter auth secret and key.

## Overview

The hosted version of report (https://report.bitfinex.com) will not allow access via API keys (for security reasons), https://report.bitfinex.com will be only accessible starting from https://www.bitfinex.com/report that will redirect the user to https://report.bitfinex.com/?auth=UUID

User can use either the UUID(not support yet) or the API key to access his data.

## 3rd party libraries

* react/redux/redux-saga for core architecture
* [re-ducks](https://github.com/alexnm/re-ducks)-like state structure
* blueprintjs for ui framework http://blueprintjs.com
* flexboxgrid2 for layout http://flexboxgrid.com/
* [redux-persist] for local storage selected state
