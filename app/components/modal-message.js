import Ember from 'ember';
const { Component, computed, inject, isPresent, run } = Ember;

export default Component.extend({
  status: inject.service(),

  _transitionDuration: 150,

  showModalOnInit: false,
  errorMessage: computed.alias('status.errorMessage'),
  activateModal: computed('errorMessage', 'showModalOnInit', function() {
    return this.get('showModalOnInit') || isPresent(this.get('errorMessage'));
  }),

  messageDidActivate: Ember.observer('activateModal', function() {
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
        this.set('showModalBackdrop', true);
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
