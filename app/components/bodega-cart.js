import Ember from 'ember';
const { Component, computed, inject } = Ember;

export default Component.extend({
  applePay: inject.service(),

  applePayIsAvailable: computed.readOnly('applePay.isAvailable'),

  // Expected actions
  increment() {throw new Error('need to pass `increment` to bodega-cart')},
  decrement() {throw new Error('need to pass `decrement` to bedega-cart')}
});
