import Component from '@ember/component';
/* global Flickity */

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);
    new Flickity(this.element, {
      contain: true,
      cellSelector: '.item',
      setGallerySize: false,
      arrowShape: {
        x0: 10,
        x1: 45, y1: 50,
        x2: 65, y2: 50,
        x3: 30
      }
    });
  }
});
