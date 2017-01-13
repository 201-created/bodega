import Ember from 'ember';
import Order from 'bodega/utils/order';
const { Service, computed, observer, get, inject } = Ember;

export default Service.extend({
  localStorage: inject.service(),

  init() {
    this._super(...arguments);

    let persistedJSON = this.get('localStorage.order');
    let orderData = persistedJSON ? JSON.parse(persistedJSON) : [];
    this.set('order', new Order(orderData));
  },

  quantity: computed.reads('order.quantity'),
  lineItems: computed.reads('order.lineItems'),
  price: computed.reads('order.price'),
  name: computed.reads('order.name'),

  addItem(item) {
    this.set('order', this.order.addItem({
      id: item.id,
      name: get(item, 'name'),
      price: get(item, 'price'),
      url: get(item, 'url')
    }));
  },

  decrement(lineItem) {
    this.set('order', this.order.decrement(lineItem));
  },

  increment(lineItem) {
    this.set('order', this.order.increment(lineItem));
  },

  clear() {
    this.set('order', new Order([]));
  },

  persistOrderData: observer('order', function() {
    let json = JSON.stringify(this.order.serialize());
    this.get('localStorage').set('order', json);
  })
});
