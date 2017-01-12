import Ember from 'ember';

export default Ember.Component.extend({
  // Expected actions
  increment() { throw new Error('need to pass `increment` to bodega-cart') },
  decrement() { throw new Error('need to pass `decrement` to bedega-cart') }
});
