import { find, visit, currentURL } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /index', async function(assert) {
    let items = this.server.createList('item', 5);
    await visit('/');

    assert.equal(currentURL(), '/');

    items.forEach(i => {
      assert.ok(find(`[data-test-item="${i.id}"]`), `has item id ${i.id}`);
    });
  });
});
