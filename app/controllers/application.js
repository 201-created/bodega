import Ember from 'ember';
import { duration } from 'bodega/transitions';
const { Controller, inject } = Ember;

export default Controller.extend({
  animationRules,
  footerAnimationRules,

  cart: inject.service()
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
