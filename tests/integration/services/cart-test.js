import { moduleFor, test } from 'ember-qunit';
import FakeLocalStorage from 'bodega/tests/fakes/local-storage';

moduleFor('service:cart', 'Integration | Service | cart', {
  integration: true,

  beforeEach() {
    this.register('service:localStorage', FakeLocalStorage);
    this.localStorage = this.container.lookup('service:localStorage');
  }
});

test('serializes the order to localStorage', function(assert) {
  let cart = this.subject();
  let item = {
    id: 1,
    name: 'Item Name',
    price: 2,
    url: '/image.png'
  };

  cart.addItem(item);

  assert.equal(
    this.localStorage.get('order'),
    JSON.stringify([item]),
    'stores order as a JSON string'
  );
});

test('loads the order from localStorage', function(assert) {
  let item = {
    id: 1,
    name: 'Item Name',
    price: 2,
    url: '/image.png'
  };

  this.localStorage.set('order', JSON.stringify([item]));

  let cart = this.subject();

  assert.equal(cart.get('name'), 'Item Name', 'loads order from localStorage');
})
