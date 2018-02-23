import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { isPresent } from '@ember/utils';
import { run } from '@ember/runloop';

export default Component.extend({
  status: service(),

  _transitionDuration: 150,

  showModalOnInit: false,
  errorMessage: alias('status.errorMessage'),
  activateModal: computed('errorMessage', 'showModalOnInit', function() {
    return this.get('showModalOnInit') || isPresent(this.get('errorMessage'));
  }),

  messageDidActivate: observer('activateModal', function() {
    if (this.get('activateModal')) {
      this.send('showModal');
    }
    else {
      this.send('hideModal');
    }
  }).on('init'),

  actions: {
    showModal() {
      this.setProperties({isVisible: true, showModalBackdrop: true});
      run.later(() => {
        if (this.isDestroyed) { return; }
        this.set('showModalContent', true);
      }, this._transitionDuration);
    },

    hideModal() {
      this.set('showModalContent', false);
      run.later(() => {
        if (this.isDestroyed) { return; }
        this.set('showModalBackdrop', false);
      }, this._transitionDuration);

      run.later(() => {
        if (this.isDestroyed) { return; }
        this.set('isVisible', false);
      }, this._transitionDuration * 2);
    }
  }
});
