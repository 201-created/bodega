import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.peekRecord('item', params.id);
  },
  setupController(controller, model) {
    this._super(...arguments);
    this.controllerFor('application').set('focusedItem', model);
  },

  resetController() {
    this._super(...arguments);
    this.controllerFor('application').set('focusedItem', null);
  }
});
