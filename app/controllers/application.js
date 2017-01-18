import Ember from 'ember';
import config from 'bodega/config/environment';
const { Controller, inject } = Ember;
const { animationDuration: duration } = config;

export default Controller.extend({
  animationRules,
  footerAnimationRules,

  cart: inject.service(),

  actions: {
    increment(lineItem) {
      this.get('cart').increment(lineItem);
    },

    decrement(lineItem) {
      this.get('cart').decrement(lineItem);
    }
  }
});

function animationRules() {
  let fadeDuration = duration / 2;
  this.transition(
    this.use('explode', {
      pick: '.back-button',
      use: ['fade', { delay: duration, duration: fadeDuration }]
    }, {
      use: ['fade', { duration: fadeDuration }]
    })
  );
}

function footerAnimationRules() {
  this.transition(
    this.toValue(true),
    this.useAndReverse('fade', { duration: (duration * 2)})
  );
}
