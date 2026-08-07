module.exports = {
  presets: [
    // Was '@vue/app', the Vue CLI 3 preset name, which resolves to the bare package
    // '@vue/babel-preset-app'. npm installs that nested under
    // node_modules/@vue/cli-plugin-babel/node_modules/, so from the project root it
    // is not resolvable and every vue-cli-service command dies with
    // "Cannot find module '@vue/babel-preset-app'": lint and build both, from a
    // clean `npm ci` against this repo's own lockfile.
    //
    // '@vue/cli-plugin-babel/preset' is the CLI 4 name and resolves from inside the
    // plugin, which is why the two sibling repos (basic-vue-vuex, basic-vue-sibling)
    // already worked.
    '@vue/cli-plugin-babel/preset'
  ]
}
