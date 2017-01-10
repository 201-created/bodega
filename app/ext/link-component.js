import Ember from 'ember';
const { LinkComponent } = Ember;

export default LinkComponent.reopen({
  attributeBindings: ['data-test-selector']
});
