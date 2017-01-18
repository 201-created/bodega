import Ember from 'ember';
const { assign, Component, computed, get, inject } = Ember;

export default Component.extend({
  store: inject.service(),
  router: inject.service(),
  stripeCheckout: inject.service(),
  cart: inject.service(),
  status: inject.service(),
  online: inject.service(),

  errorMessage: computed.alias('status.errorMessage'),
  isDisabled: computed.not('online.isOnline'),

  title: computed('isDisabled', function() {
    return this.get('isDisabled') ?
      'Checkout is not available when you are offline' :
      'Pay with Credit Card';
  }),

  willDestroyElement() {
    if (this.handler) {
      this.handler.close();
    }

    this._super(...arguments);
  },

  _shippingAddress(addresses) {
    let names = addresses.shipping_name.split(' ');
    let givenName = names[0];
    let familyName = names[names.length - 1];

    return {
      givenName,
      familyName,
      addressLines: [ addresses.shipping_address_line1 ],
      locality: addresses.shipping_address_city,
      administrativeArea: addresses.shipping_address_state,
      postalCode: addresses.shipping_address_zip,
      countryCode: addresses.shipping_address_country_code
    };
  },

  _saveCharge(token, addresses) {
    let store = this.get('store');
    let item = this.get('item');
    let price = get(item, 'price');

    let shippingAddress = this._shippingAddress(addresses);
    let params = assign({}, shippingAddress, {
      token: token.id,
      emailAddress: token.email,
      price,
      item,
      description: `201 Created Sticker: ${get(item, 'name')}`
    });

    let charge = store.createRecord('charge', params);

    charge.save().then(() => {
      if (this.get('isDestroyed')) { return; }
      this.get('cart').clear();

      let router = this.get('router');
      router.transitionTo('success', charge);
    }).catch(() => {
      if (this.get('isDestroyed')) { return; }
      this.set('errorMessage', 'Purchase failed');
    });
  },

  actions: {
    checkout() {
      this.set('errorMessage', null);

      let tokenCallback = this._saveCharge.bind(this);
      this.handler = this.get('stripeCheckout').createHandler(tokenCallback);

      this.handler.open({
        name: '201 Created, Inc',
        description: '201 Created Sticker',
        amount: this.get('item.price')
      });
    }
  }
});
