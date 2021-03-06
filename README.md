# Fetching and rendering data with Vue.js

[![Greenkeeper badge](https://badges.greenkeeper.io/alpersonalwebsite/basic-vue-state-fetch.svg)](https://greenkeeper.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

This is an easy, basic and raw (no styles attached) example of **HOW to** `fetch` data from a `REST end-point` using `Vue.js`.

Feel free to replace the `API` with yours or an external one. In any case (also for `localhost` with other `port`) remember to `enable CORS`.

---

*Post-published msg!*

I duplicated the original component `User`; after making slight changes, we have:

* **UserWithCallback** -> using a `callback` to update in the `parent` the selected user.
* **UserWithEmit** -> using a custom event, (aka, emitting) to update in the `parent` the selected user.

Both approaches are valid and produce the same result.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
