# Fetching and rendering data with Vue.js

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

An easy, basic and raw (no styles attached) example of **HOW to** `fetch` data from a
`REST endpoint` in `Vue.js`, put it in component state, and render it.

It also shows the two ways a child tells its parent that something was clicked, side
by side on the same list:

| Component | How it reports a selection |
| --- | --- |
| `src/components/UserWithEmit.vue` | `this.$emit('selectedUser', user)`, parent listens with `v-on:selectedUser` |
| `src/components/UserWithCallback.vue` | calls a function the parent passed down as a prop |

Both produce the same result. The difference worth noticing: an event does not care
who listens or whether anyone does, while a callback prop couples the child to one
specific caller's function.

## Pointing it at an API

The endpoint is `VUE_APP_API_URL`, and it defaults to
`http://localhost:3333/api/users`, which is
[node-express-postgresql](https://github.com/alpersonalwebsite/node-express-postgresql)
running locally. That is the project the original hardcoded endpoint
(`node-express-postgre.herokuapp.com`) was serving, before Heroku retired its free
dynos and the host started answering `404 No such app`.

```shell
cp .env.example .env      # then edit it, .env is gitignored
```

Only variables prefixed `VUE_APP_` reach client code, and Vue CLI **inlines them at
build time**, so whatever you put there ends up in `dist/js/app.*.js` and is readable
by anyone who opens devtools. An endpoint URL is fine. A key or a token is not.

To use the sibling backend, clone and start it, then `npm run serve` here. Enable
`CORS` on it, which that repo already does, and on anything else you point this at.

**If you point it at a different API**, the component handles both a bare array and a
`{ "data": [ ... ] }` wrapper, but the field names are not negotiable: it renders
`firstname` and `lastname` and keys on `id`, matching the backend above. Adjust
`UserWithEmit.vue` and `UserWithCallback.vue` for your own shape.

## What happens when the request fails

It tells you. `UserList.vue` tracks `loading` and `error` as separate state and
renders four distinct cases: in flight, failed (with the reason and a Retry button),
succeeded but empty, and succeeded with rows. An earlier version had a single
`v-if="!users.length"` and no `.catch`, so all three of the first cases showed
`Loading...`, indefinitely, with an unhandled rejection in the console as the only
clue. Distinguishing them is most of what "fetching data" actually involves.

## Project setup

```shell
npm install
```

`package-lock.json` is the committed lockfile, so this is an npm project. Earlier
versions of this README said `yarn install`, which resolves a fresh dependency tree
and ignores those pins.

### Compiles and hot-reloads for development

```shell
npm run serve
```

### Compiles and minifies for production

```shell
npm run build
```

**On Node 17 or newer this fails** with `ERR_OSSL_EVP_UNSUPPORTED`. That is webpack 4
(via `@vue/cli-service` 4) using an MD4 hash that OpenSSL 3 no longer provides, not a
problem with this code. `.nvmrc` says `lts/*`, which today resolves to a Node well
past 17. The dependencies here are deliberately left at their versions, so pass the
flag instead:

```shell
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

`npm run serve` is unaffected.

### Lints and fixes files

```shell
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
