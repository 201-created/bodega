import { find, currentURL, visit } from 'ember-native-dom-helpers';
import { test } from 'qunit';
import moduleForAcceptance from 'bodega/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | success');

test('visiting /success', async function(assert) {
  this.server.createList('item', 5);

  await visit('/success/test');

  assert.equal(currentURL(), '/success/test');
  let expected = '201 Created Sticker: Seat (2x), Touch, Space (3x)';
  assert.ok(find('.modal.fade.show'), 'modal is visible');
  assert.ok(find(`[data-test-description="${expected}"]`), 'description rendered');
});
