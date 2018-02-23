import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  applePay: service(),

  applePayIsAvailable: readOnly('applePay.isAvailable'),

  // Expected actions
  increment() {throw new Error('need to pass `increment` to bodega-cart')},
  decrement() {throw new Error('need to pass `decrement` to bedega-cart')}
});
