/* global server */
import { test } from 'qunit';
import moduleForAcceptance from 'bodega/tests/helpers/module-for-acceptance';
import testSelector from 'bodega/tests/helpers/ember-test-selectors';

moduleForAcceptance('Acceptance | index', {
  beforeEach() {
    this.server = server;
  }
});

test('visiting /index', function(assert) {
  let items = this.server.createList('item', 5);
  visit('/');

  andThen(function() {
    items.forEach(i => {
      assert.ok(find(testSelector('item', i.id)).length, `has item id ${i.id}`);
    });
  });
});
