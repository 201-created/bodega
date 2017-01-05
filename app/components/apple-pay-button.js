/* global Stripe, ApplePaySession */
import Ember from 'ember';
import $ from 'jquery';
import config from 'bodega/config/environment';

const { Component, /* computed, */ inject, run } = Ember;

export default Component.extend({
  stripe: inject.service(),
  applePay: inject.service(),

  // TODO eventually, use the applePay.isAvailable flag here. Hardcode to true
  // for now (to simplify visual testing on non-apple-pay platforms)
  isAvailable: true, // computed.readOnly('applePay.isAvailable'),
  errorMessage: null,
  successMessage: null,

  init() {
    this._super(...arguments);
    this.get('applePay');
  },

  actions: {
    beginApplePay() {
      this.setProperties({
        errorMessage: null,
        successMessage: null
      });

      let item = this.get('item');
      let price = item.get('price');
      let paymentRequest = {
        requiredShippingContactFields: ['email', 'postalAddress'],
        countryCode: 'US',
        currencyCode: 'USD',
        total: {
          label: 'Stripe.com',
          amount:  price / 100 + ''
        }
      };

      let session = Stripe.applePay.buildSession(paymentRequest, (result, completion) => {
        let payload = {
          shippingContact: result.shippingContact,
          token: result.token.id,
          price
        };

        $.post(`${config.apiHost}/api/charges`, payload).done(() => {
          if (this.get('isDestroyed')) { return; }
          run(() => {
            this.set('successMessage', 'Purchase is on its way');
            completion(ApplePaySession.STATUS_SUCCESS);

          });
        }).fail(() => {
          if (this.get('isDestroyed')) { return; }
          run(() => {
            this.set('errorMessage', 'Purchase failed');
            completion(ApplePaySession.STATUS_FAILURE);
          });
        });

      }, (error) => {
        if (this.get('isDestroyed')) { return; }
        this.set('errorMessage', error.message);
      });

      session.begin();
    }
  }
});
