import Ember from 'ember';
const { Component, computed, inject } = Ember;
const { htmlSafe } = Ember.String;

export function smsHref(id){
  let url = `${window.location.origin}/item/${id}`;
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
