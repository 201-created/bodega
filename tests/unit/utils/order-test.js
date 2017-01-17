import { test, module } from 'qunit';
import Order from 'bodega/utils/order';

module('Unit | utils | order');

test('getting the price of an order', function(assert) {
  let order = new Order([{ price: 2 }, { price: 3 }]);

  assert.equal(order.price, 5);
});

test('getting lineItems from the order', function(assert) {
  let order = new Order([{
    id: 1,
    name: 'Item 1',
    price: 2,
    url: '/item-1.png'
  }, {
    id: 1,
    name: 'Item 1',
    price: 3,
    url: '/item-1.png'
  }, {
    id: 2,
    name: 'Item 2',
    price: 1,
    url: '/item-2.png'
  }]);

  assert.equal(order.lineItems.length, 2, 'aggregates items into 2 lineItems');

  assert.deepEqual(order.lineItems[0], {
    itemId: 1,
    name: 'Item 1',
    price: 5,
    quantity: 2,
    multiple: true,
    url: '/item-1.png'
  }, 'first line item is aggregate of 2 items');

  assert.deepEqual(order.lineItems[1], {
    itemId: 2,
    name: 'Item 2',
    price: 1,
    quantity: 1,
    multiple: false,
    url: '/item-2.png'
  }, 'second line item is has same value as item 2');
})

test('order name lists all items and quantities', function(assert) {
  let order = new Order([{
    id: 1,
    name: 'Item 1'
  }, {
    id: 1,
    name: 'Item 1'
  }, {
    id: 2,
    name: 'Item 2'
  }]);

  assert.equal(order.name, 'Item 1 (2x), Item 2', 'has name with all items and quantities');
});

test('addItem - increments with an existing lineItem', function(assert) {
  let item = {
    id: 1,
    name: 'Item 1',
    price: 2
  }

  let order = new Order([item]);

  order = order.addItem(item);

  assert.equal(order.quantity, 2, 'quantity incremented');
  assert.equal(order.price, 4, 'price increased');
  assert.equal(order.name, 'Item 1 (2x)', 'name updated');
})

test('decrement - decrements an existing lineItem', function(assert) {
  let order = new Order([{
    id: 1,
    name: 'Item 1',
    price: 2
  }, {
    id: 1,
    name: 'Item 1',
    price: 2
  }]);

  let lineItem = order.lineItems[0];

  order = order.decrement(lineItem);

  assert.equal(order.lineItems.length, 1, 'still has a lineItem');

  assert.equal(order.quantity, 1, 'quantity decremented');
  assert.equal(order.price, 2, 'price decreased');
  assert.equal(order.name, 'Item 1', 'name updated');
})

test('decrement - removes an existing lineItem', function(assert) {
  let order = new Order([{
    id: 1,
    name: 'Item 1',
    price: 2
  }]);

  let lineItem = order.lineItems[0];
  order = order.decrement(lineItem);

  assert.equal(order.lineItems.length, 0, 'has no lineItems');
  assert.equal(order.quantity, 0, 'has no items');
  assert.equal(order.price, 0, 'has zero price');
  assert.equal(order.name, '', 'has blank name');
})

test('increment - adds to existing lineItem', function(assert) {
  let order = new Order([{
    id: 1,
    name: 'Item 1',
    price: 2
  }]);

  let lineItem = order.lineItems[0];
  order = order.increment(lineItem);

  assert.equal(order.lineItems.length, 1, 'still has one lineItem');
  assert.equal(order.lineItems[0].quantity, 2, 'lineItem quantity in incremented');
  assert.equal(order.quantity, 2, 'quantity is incremented');
  assert.equal(order.price, 4, 'price increases');
  assert.equal(order.name, 'Item 1 (2x)', 'name is updated');
})
