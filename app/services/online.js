import Ember from 'ember';

let Service;

if (typeof Fastboot !== 'undefined') {
  Service = Ember.Service.extend({
    isOnline: false
  });
} else {
  Service = Ember.Service.extend({
    isOnline: window.navigator ? window.navigator.onLine : true,

    init() {
      this._super(...arguments);
      this._online = () => {
        Ember.run(this, 'set', 'isOnline', true);
      };
      this._offline = () => {
        Ember.run(this, 'set', 'isOnline', false);
      };
      window.addEventListener('online', this._online);
      window.addEventListener('offline', this._offline);
    },

    willDestroy() {
      window.removeEventListener('online', this._online);
      window.removeEventListener('offline', this._offline);
    }
  });
}

export default Service;
