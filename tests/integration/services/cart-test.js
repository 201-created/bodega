import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import FakeLocalStorage from 'bodega/tests/fakes/local-storage';

module('Integration | Service | cart', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:localStorage', FakeLocalStorage);
    this.localStorage = this.owner.lookup('service:localStorage');
  });

  test('serializes the order to localStorage', function(assert) {
    let cart = this.owner.lookup('service:cart');
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

    let cart = this.owner.lookup('service:cart');

    assert.equal(cart.get('name'), 'Item Name', 'loads order from localStorage');
  })
});