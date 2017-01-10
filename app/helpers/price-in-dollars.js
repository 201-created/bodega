import Ember from 'ember';

export default Ember.Helper.helper(function(priceInCents) {
  return priceInCents / 100;
});
