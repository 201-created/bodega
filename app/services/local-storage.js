import Ember from 'ember';

export default Ember.Service.extend({
  unknownProperty(key) {
    if (window.localStorage && window.localStorage.getItem) {
      return window.localStorage.getItem(key);
    }
  },

  setUnknownProperty(key, value) {
    if (window.localStorage && window.localStorage.setItem) {
      return window.localStorage.setItem(key, value);
    }
  }
});
