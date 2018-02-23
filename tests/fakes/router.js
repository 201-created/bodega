import Service from '@ember/service';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.transitions = [];
  },

  transitionTo() {
    this.transitions.push(arguments);
  }
});
