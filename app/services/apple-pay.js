/* global Stripe */
import Ember from 'ember';
const { Service } = Ember;

export default Service.extend({
  isAvailable: false,
  init() {
    this._super(...arguments);

    if (Stripe && Stripe.applePay) {
      Stripe.applePay.checkAvailability((result) => {
        this.set('isAvailable', result);
      });
    }
  }
});
