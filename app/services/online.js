import Service from 'ember-service';
import computed from 'ember-computed';
import injectService from 'ember-service/inject'
import run from 'ember-runloop';

export default Service.extend({
  fastboot: injectService(),
  isFastboot: computed.readOnly('fastboot.isFastBoot'),
  init() {
    this._super(...arguments);

    let isOnline = (
      this.get('isFastboot') ?
      false :
      (
        window.navigator ? window.navigator.onLine : true
      )
    );

    this.set('isOnline', isOnline);

    if (!this.get('isFastboot')) {
      this._online = () => {
        run(this, 'set', 'isOnline', true);
      };
      this._offline = () => {
        run(this, 'set', 'isOnline', false);
      };
      window.addEventListener('online', this._online);
      window.addEventListener('offline', this._offline);
    }
  },

  willDestroy() {
    if (!this.get('isFastboot')) {
      window.removeEventListener('online', this._online);
      window.removeEventListener('offline', this._offline);
    }
  }
});
