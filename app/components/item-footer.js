import Ember from 'ember';
const { Component, inject } = Ember;

export default Component.extend({
  cart: inject.service(),

  actions: {
    addToCart() {
      this.get('cart').addItem(this.get('item'));
    }
  }
});
