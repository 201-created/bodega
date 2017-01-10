import Ember from 'ember';
const { Service, A: EmberArray, computed } = Ember;

export default Service.extend({
  init() {
    this._super(...arguments);

    // TODO: localstorage deserialize
    this.items = new EmberArray();
  },

  count: computed.reads('items.length'),

  addItem(item) {
    this.items.pushObject(item.id);
  },
});
