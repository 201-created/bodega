/* global Stripe */

/*
 * This is a temporary hack until a patch lands upstream:
 *
 *   https://github.com/code-corps/ember-stripe-service
 */

import EmberError from '@ember/error';

import Ember from 'ember';
import config from '../config/environment';
import StripeMock from 'ember-stripe-service/utils/stripe-mock';

export function initialize() {
  const application = arguments[1] || arguments[0];
  application.register('config:ember-stripe-service', config, { instantiate: false });
  application.inject('service:stripe', 'config', 'config:ember-stripe-service');

  if (config.LOG_STRIPE_SERVICE) {
    Ember.Logger.info('StripeService: initialize');
  }

  if (!config.stripe.publishableKey) {
    throw new EmberError('StripeService: Missing Stripe key, please set `ENV.stripe.publishableKey` in config.environment.js');
  }

  if (typeof FastBoot !== 'undefined' || typeof Stripe === 'undefined') {
    window.Stripe = StripeMock;
  }

  Stripe.setPublishableKey(config.stripe.publishableKey);
}

export default {
  name: 'ember-stripe-stripe',
  initialize: initialize
};
