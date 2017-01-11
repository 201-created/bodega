import Ember from 'ember';
const { Service, getOwner } = Ember;

export default Service.extend({
  init() {
    this._super(...arguments);
    this.router = getOwner(this).lookup('router:main');
  },

  transitionTo() {
    this.router.transitionTo(...arguments);
  }
});
