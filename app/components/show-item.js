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

  click() {
    this.get('cart').addItem(this.get('item'));
  },

  didInsertElement() {
    this.element.setAttribute('data-test-add-to-cart', true);
  }
});
