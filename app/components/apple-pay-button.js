import Ember from 'ember';

const { assign, Component, /*computed,*/ inject, get } = Ember;

export default Component.extend({
  stripe: inject.service(),
  applePay: inject.service(),
  store: inject.service(),
  router: inject.service(),
  cart: inject.service(),

  isAvailable: true, //computed.readOnly('applePay.isAvailable'),
  errorMessage: null,
  successMessage: null,

  init() {
    this._super(...arguments);
    this.get('applePay');
  },

  actions: {
    beginApplePay() {
      this.setProperties({
        errorMessage: null,
        successMessage: null
      });

      let item = this.get('item');
      let price = get(item, 'price');
      let paymentRequest = {
        requiredShippingContactFields: ['email', 'postalAddress'],
        countryCode: 'US',
        currencyCode: 'USD',
        total: {
          label: 'Stripe.com',
          amount:  price / 100 + ''
        }
      };

      let router = this.get('router');

      this.get('applePay').charge(paymentRequest).then(({ result, notify }) => {
        let store = this.get('store');
        let params = assign({}, result.shippingContact, {
          token: result.token.id,
          price,
          item,
          description: `201 Created Sticker: ${get(item, 'name')}`
        });
        let charge = store.createRecord('charge', params);

        charge.save().then(() => {
          if (this.get('isDestroyed')) { return; }
          this.set('successMessage', 'Purchase is on its way');
          notify.success();
          this.get('cart').clear();

          router.transitionTo('success', charge);
        }).catch(() => {
          if (this.get('isDestroyed')) { return; }
          this.set('errorMessage', 'Purchase failed');
          notify.failure();
        });
      }, (error) => {
        if (this.get('isDestroyed')) { return; }
        this.set('errorMessage', error.message);
      });
    }
  }
});
