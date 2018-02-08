import { findAll, visit } from 'ember-native-dom-helpers';
import { test } from 'qunit';
import moduleForAcceptance from 'bodega/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index');

test('visiting /index', async function(assert) {
  let items = this.server.createList('item', 5);
  await visit('/');

  items.forEach(i => {
    assert.ok(findAll(`[data-test-item="${i.id}"]`).length, `has item id ${i.id}`);
  });
});
