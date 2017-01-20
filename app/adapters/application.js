import DS from 'ember-data';
import config from 'bodega/config/environment';

export default DS.JSONAPIAdapter.extend({
  namespace: config.apiNamespace,
  host: config.apiHost,

  shouldBackgroundReloadAll() {
    return false;
  }
});
