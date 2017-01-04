// ember-cli-mirage adds a window.server global
// export it here to have a clean path forward to a future version
// where mirage's server is importable and non-global
export default function () {
  return window.server;
}
