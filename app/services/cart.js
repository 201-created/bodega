import Ember from 'ember';
const { Service, A: EmberArray, computed, get } = Ember;

export default Service.extend({
  init() {
    this._super(...arguments);

    // TODO: localstorage deserialize
    this.items = new EmberArray();
  },

  count: computed.reads('items.length'),

  order: computed('items.@each', function() {
    let count = this.get('count');

    let name;
    if (count === 1) {
      name = this.get('items.firstObject.name');
    } else {
      name = `${this.get('count')} Stickers`;
    }

    let price = this.get('items').reduce((sum, item) => {
      return get(item, 'price') + sum
    }, 0);

    return { name, price };
  }),

  addItem(item) {
    this.items.pushObject(item);
  },
});
