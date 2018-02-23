import Service from '@ember/service';
import { getOwner } from '@ember/application';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.router = getOwner(this).lookup('router:main');
  },

  transitionTo() {
    this.router.transitionTo(...arguments);
  }
});
