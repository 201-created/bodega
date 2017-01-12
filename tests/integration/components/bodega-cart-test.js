import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'bodega/tests/helpers/ember-test-selectors';

moduleForComponent('bodega-cart', 'Integration | Component | item details', {
  integration: true
});

test('disabling pay when the quantity is zero', function(assert) {
  this.set('order', {
    quantity: 0
  });

  this.render(hbs`{{bodega-cart order=order}}`);

  let totalQuantity = this.$(testSelector('total-quantity')).text();
  assert.equal(totalQuantity, '0', 'shows zero quantity');

  assert.equal(this.$('button')[0].disabled, true, 'button is disabled');
})
