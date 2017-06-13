import { test } from 'qunit';
import moduleForAcceptance from 'bodega/tests/helpers/module-for-acceptance';
import testSelector from 'ember-test-selectors';

moduleForAcceptance('Acceptance | success');

test('visiting /success', function(assert) {
  this.server.createList('item', 5);

  visit('/success/test');

  andThen(function() {
    assert.equal(currentURL(), '/success/test');
    let expected = '201 Created Sticker: Seat (2x), Touch, Space (3x)';
    assert.ok(find('.modal.fade.show').length, 'modal is visible');
    assert.ok(find(testSelector('description', expected)).length, 'description rendered');
  });
});
