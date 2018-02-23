import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bodega-cart', function(hooks) {
  setupRenderingTest(hooks);

  test('disabling pay when the quantity is zero', async function(assert) {
    this.set('order', {
      quantity: 1
    });

    await render(hbs`{{bodega-cart order=order}}`);

    assert.equal(find('button').disabled, false, 'precondition - button is enabled');

    this.set('order', {
      quantity: 0
    });

    assert.equal(find('button').disabled, true, 'button is disabled');
  })
});
