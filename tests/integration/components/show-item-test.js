import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { smsHref } from 'bodega/components/show-item';

moduleForComponent('show-item', 'Integration | Component | show item', {
  integration: true
});

test('it renders', function(assert) {
  let item = {id: 1, name: 'my item', url: '/dummy-image', price: 1099};
  this.set('item', item);
  this.render(hbs`{{show-item item=item}}`);

  assert.ok(find(`[data-test-item="${item.id}"]`), 'displays item');
  assert.ok(find(`img[src="${item.url}"]`), 'shows image');
});

// TODO: The SMS link needs to find a new home.
skip('show SMS link when focused', function(assert) {
  let item = {id: 1, name: 'my item', url: '/dummy-image', price: 1099};
  this.set('item', item);
  this.set('isFocused', false);
  this.render(hbs`{{show-item item=item isFocused=isFocused}}`);

  assert.notOk(find('show-item.is-focused'), 'no is-focused class');

  this.set('isFocused', true);

  assert.ok(find('.show-item.is-focused'), 'is-focused class');
  let href = smsHref(item.id);
  assert.ok(find(`a[href="${href}"]`), 'user can see SMS link');
});
