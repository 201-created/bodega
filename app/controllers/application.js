import Ember from 'ember';
import { duration } from 'bodega/transitions';
const { Controller } = Ember;

export default Controller.extend({
  animationRules,
  footerAnimationRules
});

function animationRules() {
  let fadeDuration = duration / 2;
  this.transition(
    this.use('fade', { duration: fadeDuration })
  );
}

function footerAnimationRules() {
  this.transition(
    this.toValue(true),
    this.use('toLeft', { duration }),
    this.reverse('toRight', { duration })
  );
}
