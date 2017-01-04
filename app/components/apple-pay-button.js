/* global Stripe, ApplePaySession */
import Ember from 'ember';
import $ from 'jquery';

const { Component, computed, inject } = Ember;

export default Component.extend({
  stripe: inject.service(),
  applePay: inject.service(),
  isAvailable: computed.readOnly('applePay.isAvailable'),
  errorMessage: null,

  init() {
    this._super(...arguments);
    this.get('applePay');
  },

  actions: {
    beginApplePay() {
      this.set('errorMessage', null);
      let item = this.get('item');
      let price = item.get('price');
      let paymentRequest = {
        requiredShippingContactFields: ['emailAddress'],
        countryCode: 'US',
        currencyCode: 'USD',
        total: {
          label: 'Stripe.com',
          amount:  price / 100 + ''
        }
      };


      let session = Stripe.applePay.buildSession(paymentRequest, (result, completion) => {
        completion(ApplePaySession.STATUS_SUCCESS);

        let payload = {
          token: result.token.id,
          price
        };

        // TODO configure
        $.post('https://localhost.ssl:3000/api/charges', payload).done(() => {
          completion(ApplePaySession.STATUS_SUCCESS);
          // You can now redirect the user to a receipt page, etc.
          window.location.href = '/success.html';
        }).fail(() => {
          completion(ApplePaySession.STATUS_FAILURE);
        });

      }, (error) => {
        this.set('errorMessage', error.message);
      });

      session.begin();
    }
  }
});
