import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | item details', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    let item = {id: 1, name: 'my item', url: '/dummy-image', price: 1099};
    this.set('item', item);
    await render(hbs`{{item-details item=item}}`);

    assert.ok(find(`[data-test-name="${item.name}"]`), 'displays name');
    assert.ok(find(`[data-test-price="${item.price / 100}"]`), 'displays price');
  });
});
