/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'bodega',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    // apiHost: 'https://localhost.ssl:3000',
    apiHost: 'https://api.shop-201.com',
    wwwHost: '',
    apiNamespace: 'api',
    stripe: {
      publishableKey: 'pk_test_SrD06JdAhT0DZvBEK8SZ9aiB'
    },
    animationDuration: 400
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    // Fastboot doesn't work locally with SSL so use this non-ssl URL
    // and follow instructions in bodega-backend README to run in non-SSL mode.
    // If you want to test Apple Pay, you must use SSL, so use `ember serve` instead of `ember fastboot`
    // ENV.apiHost = 'http://localhost:3000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.stripe.publishableKey = 'pk_test_SrD06JdAhT0DZvBEK8SZ9aiB';
    ENV.apiHost = '';
    ENV.animationDuration = 0;
  }

  if (environment === 'production') {
    ENV.stripe.publishableKey = 'pk_live_f90QszZOgLBlf3U25ZhPnV0M';
    ENV.apiHost = 'https://api.shop-201.com';
    ENV.wwwHost = 'https://shop-201.com';

    ENV['ember-cli-mirage'] = {
      enabled: false
    };
  }

  return ENV;
};
