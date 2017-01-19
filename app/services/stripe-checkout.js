/* global StripeCheckout */
import Ember from 'ember';
import config from 'bodega/config/environment';
const { Service } = Ember;

export default Service.extend({
  createHandler(tokenCallback) {
    if (StripeCheckout) {
      return StripeCheckout.configure({
        key: config.stripe.publishableKey,
        image: '/assets/images/icons/stripe-checkout-logo.png',
        locale: 'auto',
        shippingAddress: true,
        billingAddress: true,
        token: tokenCallback
      });
    }
  }
});
