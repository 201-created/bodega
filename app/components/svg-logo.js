import Ember from 'ember';
const { Component, computed } = Ember;

export default Component.extend({
  logoVariant: 'horizontal', // Also 'vertical' or 'badge'

  viewBox: computed('logoVariant', function() {
    let style = this.get('logoVariant');

    switch (style) {
      case 'vertical':
        return "0 0 304 230.6";
      case 'badge':
        return "0 0 209.9 107.6";
      default: // 'horizonal'
        return "0 0 790.7 114.6";
    }
  }),

  isHorizontal: computed.equal('logoVariant', 'horizontal'),
  isVertical: computed.equal('logoVariant', 'vertical'),
  isBadge: computed.equal('logoVariant', 'badge')
});
