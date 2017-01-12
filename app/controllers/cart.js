import Ember from 'ember';
const { Controller, inject } = Ember;

export default Controller.extend({
  cart: inject.service(),

  actions: {
    increment(lineItem) {
      this.get('cart').increment(lineItem);
    },

    decrement(lineItem) {
      this.get('cart').decrement(lineItem);
    }
  }
});
