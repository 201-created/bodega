import { test } from 'qunit';
import moduleForAcceptance from 'bodega/tests/helpers/module-for-acceptance';
import testSelector from 'bodega/tests/helpers/ember-test-selectors';
import FakeApplePay from 'bodega/tests/fakes/apple-pay';

moduleForAcceptance('Acceptance | cart-checkout');

test('purchasing an item via the cart', function(assert) {
  this.application.__deprecatedInstance__.register('service:apple-pay', FakeApplePay);

  let item = this.server.create('item', 1);
  visit(`/${item.id}`);
  click(testSelector('add-to-cart'));

  andThen(() => {
    let count = find(testSelector('cart-count')).text();
    assert.equal(count, '1', 'shows one item in the cart');
  });

  click(testSelector('selector', 'view-cart'));
  click(testSelector('pay'));

  andThen(() => {
    let charge = this.server.schema.charges.first();
    assert.deepEqual(charge.attrs, {
      description: `201 Created Sticker: ${item.name}`,
      id: "1",
      itemId: null, // TODO: One charge may have many items
      price: item.price,
      token: "fake-token-id"
    }, 'created a charge on the server');

    assert.equal(find(testSelector('success-message')).length, 1, 'shows success message');
  });
});
