import config from 'bodega/config/environment';
import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend({
  namespace: config.apiNamespace,
  host: config.apiHost,

  shouldBackgroundReloadAll() {
    return false;
  }
});
