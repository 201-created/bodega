/* global Stripe, ApplePaySession*/
import Ember from 'ember';
const { Service, RSVP } = Ember;

export default Service.extend({
  isAvailable: false,

  init() {
    this._super(...arguments);

    if (Stripe && Stripe.applePay) {
      Stripe.applePay.checkAvailability((result) => {
        this.set('isAvailable', result);
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
