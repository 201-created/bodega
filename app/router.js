import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('success', { path: '/success/:id' });
  this.route('item', { path: '/:id' });
  this.route('cart');
});

export default Router;
