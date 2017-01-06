import Ember from 'ember';
const { Component, computed } = Ember;

export default Component.extend({
  priceInDollars: computed('item.price', function() {
    return this.get('item.price') / 100;
  })
});
