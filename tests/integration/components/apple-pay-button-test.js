import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('apple-pay-button', 'Integration | Component | apple pay button', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{apple-pay-button}}`);

  assert.ok(this.$('button.apple-pay-button').length, 'has button');
});
