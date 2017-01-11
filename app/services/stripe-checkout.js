/* global StripeCheckout */
import Ember from 'ember';
import config from 'bodega/config/environment';
const { Service } = Ember;

export default Service.extend({
  createHandler(tokenCallback) {
    return StripeCheckout.configure({
      key: config.stripe.publishableKey,
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      shippingAddress: true,
      billingAddress: true,
      token: tokenCallback
    });
  }
});
