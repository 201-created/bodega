/* global Stripe, ApplePaySession*/
import Ember from 'ember';
import loadScript from 'bodega/utils/load-script';
const { Service, RSVP } = Ember;

export default Service.extend({
  isAvailable: Ember.computed(function() {
    return self.location.protocol === 'https:' && self.ApplePaySession && self.ApplePaySession.canMakePayments();
  }),

  revokeAvailability() {
    this.set('isAvailable', false);
  },

  init() {
    this._super(...arguments);
    if (this.get('isAvailable')) {
      loadScript('https://js.stripe.com/v2/').then(() => {
        if (!self.Stripe.applePay) {
          this.revokeAvailability();
        }
        Stripe.applePay.checkAvailability((result) => {
          if (this.isDestroyed) { return }
          if (!result) {
            Ember.run(() => {
              this.revokeAvailability();
            });
          }
        });
      });
    }
  },

  charge(paymentRequest) {
    return new RSVP.Promise(function(resolve, reject) {
      Stripe.applePay.buildSession(paymentRequest, buildSuccessHandler(resolve), reject).begin();
    });
  }
});

function buildSuccessHandler(resolve) {
  return function successHandlerResolution(result, completion) {
    resolve({
      result,

      notify: {
        success() {
          completion(ApplePaySession.STATUS_SUCCESS);
        },

        failure() {
          completion(ApplePaySession.STATUS_FAILURE);
        }
      }
    });
  }
}
