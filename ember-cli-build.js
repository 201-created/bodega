/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const map = require('broccoli-stew').map;
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  var browserVendorLib = new Funnel('bower_components/flickity/dist/', {
    destDir: 'flickity',
    include: ['flickity.pkgd.js']
  });

  browserVendorLib = map(browserVendorLib, (content) => {
    return `if (typeof FastBoot === 'undefined') { ${content} }`;
  });

  var app = new EmberApp(defaults, {
    fingerprint: {
      generateAssetMap: true,
      exclude: ['images']
    },
    trees: {
      vendor: browserVendorLib
    },
    'esw-cache-first': {
      patterns: [
        '/'
      ],
      version: 2
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('vendor/flickity/flickity.pkgd.js');

  return new MergeTrees([app.toTree(), browserVendorLib]);
};
