import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('success', { path: '/success/:id' });
  this.route('item', { path: '/:id' });
  this.route('cart');
});

export default Router;
