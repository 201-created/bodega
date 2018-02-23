import { reads } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';
import { get, observer } from '@ember/object';
import Order from 'bodega/utils/order';

export default Service.extend({
  localStorage: service(),

  init() {
    this._super(...arguments);

    let persistedJSON = this.get('localStorage.order');
    let orderData = persistedJSON ? JSON.parse(persistedJSON) : [];
    this.set('order', new Order(orderData));
  },

  quantity: reads('order.quantity'),
  lineItems: reads('order.lineItems'),
  price: reads('order.price'),
  name: reads('order.name'),

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
