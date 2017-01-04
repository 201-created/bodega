/* global Stripe, ApplePaySession */
import Ember from 'ember';
const { Component, inject } = Ember;

export default Component.extend({
  stripe: inject.service(),
  isAvailable: false,
  errorMessage: null,

  didInsertElement() {
    this._super(...arguments);

    if (Stripe && Stripe.applePay) {
      Stripe.applePay.checkAvailability((result) => {
        this.set('isAvailable', result);
      });
    }
  },

  actions: {
    beginApplePay() {
      let paymentRequest = {
        countryCode: 'US',
        currencyCode: 'USD',
        total: {
          label: 'Stripe.com',
          amount: '19.99'
        }
      };

      let session = Stripe.applePay.buildSession(paymentRequest, (result, completion) => {
        completion(ApplePaySession.STATUS_SUCCESS);

        // $.post('/charges', { token: result.token.id }).done(() => {
        //   completion(ApplePaySession.STATUS_SUCCESS);
        //   // You can now redirect the user to a receipt page, etc.
        //   window.location.href = '/success.html';
        // }).fail(() => {
        //   completion(ApplePaySession.STATUS_FAILURE);
        // });

      }, (error) => {
        this.set('errorMessage', error.message);
      });

      session.begin();
    }
  }
});
