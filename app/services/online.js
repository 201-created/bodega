import Ember from 'ember';

export default Ember.Service.extend({
  isOnline: window.navigator ? window.navigator.onLine : true,

  init() {
    this._super(...arguments);
    this._online = () => {
      console.log('_online');
      Ember.run(this, 'set', 'isOnline', true);
    };
    this._offline = () => {
      console.log('_offline');
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
