import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  cart: service(),

  actions: {
    addToCart() {
      this.get('cart').addItem(this.get('item'));
    }
  }
});
