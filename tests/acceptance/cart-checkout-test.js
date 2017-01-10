import { test } from 'qunit';
import moduleForAcceptance from 'bodega/tests/helpers/module-for-acceptance';
import testSelector from 'bodega/tests/helpers/ember-test-selectors';

moduleForAcceptance('Acceptance | cart-checkout');

test('adding an item to the card', function(assert) {
  let item = this.server.create('item', 1);
  visit(`/${item.id}`);
  click(testSelector('add-to-cart'));

  andThen(function() {
    let count = find(testSelector('cart-count')).text();
    assert.equal(count, '1');
  });
});
