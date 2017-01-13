import Ember from 'ember';
const { Component, computed } = Ember;

export default Component.extend({
  logoStyle: 'horizontal', // Also 'vertical' or 'badge'

  viewBox: computed('logoStyle', function() {
    let style = this.get('logoStyle');

    switch (style) {
      case 'vertical':
        return "0 0 304 230.6";
      case 'badge':
        return "0 0 209.9 107.6";
      default: // 'horizonal'
        return "0 0 790.7 114.6";
    }
  }),

  isHorizontal: computed.equal('logoStyle', 'horizontal'),
  isVertical: computed.equal('logoStyle', 'vertical'),
  isBadge: computed.equal('logoStyle', 'badge')
});
