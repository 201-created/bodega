import Ember from 'ember';

export default Ember.Service.extend({
  unknownProperty(key) {
    return window.localStorage.getItem(key);
  },

  setUnknownProperty(key, value) {
    window.localStorage.setItem(key, value);
  }
});
