import Ember from 'ember';
import config from 'bodega/config/environment';
const { Component, computed, inject } = Ember;
const { htmlSafe } = Ember.String;

export function smsHref(id){
  let url = `${config.wwwHost}/item/${id}`;
  return `sms:&body=Checkout this awesome sticker: ${url}`;
}

export default Component.extend({
  cart: inject.service(),

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
