/* global StripeCheckout */
import Ember from 'ember';
import config from 'bodega/config/environment';
import loadScript from 'bodega/utils/load-script';
const { Service } = Ember;

export default Service.extend({
  createHandler(tokenCallback) {
    return loadScript('https://checkout.stripe.com/checkout.js').then(() => {
      return StripeCheckout.configure({
        key: config.stripe.publishableKey,
        image: '/assets/images/icons/stripe-checkout-logo.png',
        locale: 'auto',
        shippingAddress: true,
        billingAddress: true,
        token: tokenCallback
      });
    });
  }
});
