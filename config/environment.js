/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'bodega',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    apiNamespace: 'api',
    stripe: {
      publishableKey: 'pk_test_SrD06JdAhT0DZvBEK8SZ9aiB'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.stripe.publishableKey = 'pk_test_SrD06JdAhT0DZvBEK8SZ9aiB';
  }

  if (environment === 'production') {
    ENV.stripe.publishableKey = 'pk_live_f90QszZOgLBlf3U25ZhPnV0M';
  }

  return ENV;
};
