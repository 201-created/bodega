import { click, find, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import FakeApplePay from 'bodega/tests/fakes/apple-pay';
import FakeLocalStorage from 'bodega/tests/fakes/local-storage';

module('Acceptance | cart-checkout', function(hooks) {
  setupApplicationTest(hooks);

  test('purchasing an item via the cart', async function(assert) {
    let appInstance = this.owner;
    appInstance.register('service:apple-pay', FakeApplePay);
    appInstance.register('service:local-storage', FakeLocalStorage);
    let localStorage = appInstance.lookup('service:local-storage');

    let item = this.server.create('item', 1);
    await visit(`/`);
    await click('[data-test-add-to-cart]');

    let quantity = find('[data-test-total-quantity]').textContent;
    assert.equal(quantity, '1', 'shows one item in the cart');
    assert.ok(localStorage.get('order'), 'something placed in order localStorage');

    await click('[data-test-pay]');

    let charge = this.server.schema.charges.first();
    assert.deepEqual(charge.attrs, {
      description: `201 Created Sticker: ${item.name}`,
      id: "1",
      // One charge may have many items. As of writing, this field isn't used.
      itemId: null,
      price: item.price,
      token: "fake-token-id"
    }, 'created a charge on the server');

    assert.ok(find('[data-test-success-message]'), 'shows success message');
    assert.equal(localStorage.get('order'), '[]', 'localStorage `order` is empty');
  });
});
