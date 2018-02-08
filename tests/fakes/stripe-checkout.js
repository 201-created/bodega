import Ember from 'ember';
const { RSVP, Service, Object: emberObject } = Ember;

export default Service.extend({
  createHandler(cb) {
    return new RSVP.Promise(resolve => {
      let handler = emberObject.create({
        cb,
        open() {
          let token = { id: 'fake-token-id' };
          let addresses = {
            shipping_name: 'Barack Obama',
            shipping_address_line1: '1600 Pennsylvania Ave.',
            shipping_address_city: 'Washington',
            shipping_address_state: 'DC',
            shipping_address_zip: '20500',
            shipping_address_country_code: 'US'
          };
          cb(token, addresses);
        },

        close() {
          this.set('cb', null);
          this.set('isClosed', true);
        }
      });

      resolve(handler);
    });
  }
});
