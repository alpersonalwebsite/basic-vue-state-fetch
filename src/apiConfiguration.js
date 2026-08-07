// The API used to be hardcoded to https://node-express-postgre.herokuapp.com/users,
// which no longer exists: Heroku's free dynos were retired, and that host now answers
// 404 with "No such app". A demo about fetching data pointed at nothing.
//
// It reads VUE_APP_API_URL instead. Vue CLI only exposes variables prefixed VUE_APP_
// to client code, and it inlines them at BUILD time, so a value put here ends up in
// dist/js/app.*.js and is readable by anyone. That is fine for an endpoint URL and is
// not fine for a key or a token: this is configuration, not a secret store.
//
// The default is the local API from
// https://github.com/alpersonalwebsite/node-express-postgresql, which is the project
// the dead Heroku app was running. See the README for starting it.
export const API =
  process.env.VUE_APP_API_URL || 'http://localhost:3333/api/users'

export const limitUserResults = 10
