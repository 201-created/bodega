import Ember from 'ember';

export default Ember.Service.extend({
  unknownProperty(key) {
    if (typeof window.localStorage !== undefined) {
      return window.localStorage.getItem(key);
    }
  },

  setUnknownProperty(key, value) {
    if (typeof window.localStorage !== undefined) {
      window.localStorage.setItem(key, value);
    }
  }
});
