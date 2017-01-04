/* global Stripe */
import Ember from 'ember';

export default Ember.Component.extend({
  stripe: Ember.inject.service(),
  isAvailable: false,

  didInsertElement() {
    this._super(...arguments);

    if (Stripe && Stripe.applePay) {
      Stripe.applePay.checkAvailability((result) => {
        this.set('isAvailable', result);
      });
    }
  }
});
