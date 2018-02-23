/* global Stripe, ApplePaySession*/
import { run } from '@ember/runloop';

import { computed } from '@ember/object';
import Service from '@ember/service';
import RSVP from 'rsvp';

export default Service.extend({
  isAvailable: computed(function() {
    return self.location && self.location.protocol === 'https:' && self.ApplePaySession && self.ApplePaySession.canMakePayments();
  }),

  revokeAvailability() {
    this.set('isAvailable', false);
  },

  init() {
    this._super(...arguments);
    if (this.get('isAvailable')) {
      if (!self.Stripe.applePay) {
        this.revokeAvailability();
      }
      Stripe.applePay.checkAvailability((result) => {
        if (this.isDestroyed) { return }
        if (!result) {
          run(() => {
            this.revokeAvailability();
          });
        }
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
