import Ember from 'ember';
import Order from 'bodega/utils/order';
const { Service, computed } = Ember;

export default Service.extend({
  init() {
    this._super(...arguments);

    this.order = new Order([]);
  },

  quantity: computed.reads('order.quantity'),
  lineItems: computed.reads('order.lineItems'),
  price: computed.reads('order.price'),
  name: computed.reads('order.name'),

  addItem(item) {
    this.set('order', this.order.addItem({
      id: item.id,
      name: item.get('name'),
      price: item.get('price'),
      url: item.get('url')
    }));
  },

  decrement(lineItem) {
    this.set('order', this.order.decrement(lineItem));
  },

  increment(lineItem) {
    this.set('order', this.order.increment(lineItem));
  }
});
