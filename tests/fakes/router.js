import Ember from 'ember';
const { Service } = Ember;

export default Service.extend({
  init() {
    this._super(...arguments);
    this.transitions = [];
  },

  transitionTo() {
    this.transitions.push(arguments);
  }
});
