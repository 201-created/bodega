/* global WheelIndicator */
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['swipeable-area'],
  didInsertElement() {
    this._super(...arguments);
    this.handleScrolling();
  },

  handleScrolling() {
    this.indicator = new WheelIndicator({
      elem: this.$()[0],
      preventMouse: false,
      callback(e) {
        console.log(e.direction, e.deltaX, e.deltaY);
      }
    });
  }
});
