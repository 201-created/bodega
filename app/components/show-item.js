import Ember from 'ember';
const { Component, computed } = Ember;
export default Component.extend({
  isFocused: false,
  priceInDollars: computed('item.price', function() {
    return this.get('item.price') / 100;
  })
});
