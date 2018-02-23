import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import Component from '@ember/component';
import { computed } from '@ember/object';
import config from 'bodega/config/environment';

export function smsHref(id){
  let url = `${config.wwwHost}/item/${id}`;
  return `sms:&body=Checkout this awesome sticker: ${url}`;
}

export default Component.extend({
  cart: service(),

  smsHref: computed('item.id', function() {
    let id = this.get('item.id');
    return htmlSafe(smsHref(id));
  }),

  actions: {
    addToCart() {
      this.get('cart').addItem(this.get('item'));
    }
  }
});
