import { equal } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';

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

  isHorizontal: equal('logoVariant', 'horizontal'),
  isVertical: equal('logoVariant', 'vertical'),
  isBadge: equal('logoVariant', 'badge')
});
