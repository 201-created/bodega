import { test } from 'qunit';
import moduleForAcceptance from 'bodega/tests/helpers/module-for-acceptance';
import testSelector from 'ember-test-selectors';

moduleForAcceptance('Acceptance | index');

test('visiting /index', function(assert) {
  let items = this.server.createList('item', 5);
  visit('/');

  andThen(function() {
    items.forEach(i => {
      assert.ok(find(testSelector('item', i.id)).length, `has item id ${i.id}`);
    });
  });
});
