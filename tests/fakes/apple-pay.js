import Ember from 'ember';
const { Service, RSVP } = Ember;

export default Service.extend({
  isAvailable: true,
  charge() {
    return new RSVP.Promise(function(resolve) {
      resolve({
        result: {
          token: { id: 'fake-token-id' }
        },
        notify: {
          success() { },
          failure() { }
        }
      })
    });
  }
});
