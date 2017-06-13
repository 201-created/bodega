import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'ember-test-selectors';
import { smsHref } from 'bodega/components/show-item';

moduleForComponent('show-item', 'Integration | Component | show item', {
  integration: true
});

test('it renders', function(assert) {
  let item = {id: 1, name: 'my item', url: '/dummy-image', price: 1099};
  this.set('item', item);
  this.render(hbs`{{show-item item=item}}`);

  assert.ok(this.$(testSelector('item', item.id)).length, 'displays item');
  assert.ok(this.$(`img[src="${item.url}"]`).length, 'shows image');
});

// TODO: The SMS link needs to find a new home.
skip('show SMS link when focused', function(assert) {
  let item = {id: 1, name: 'my item', url: '/dummy-image', price: 1099};
  this.set('item', item);
  this.set('isFocused', false);
  this.render(hbs`{{show-item item=item isFocused=isFocused}}`);

  assert.notOk(this.$('show-item.is-focused').length, 'no is-focused class');

  this.set('isFocused', true);

  assert.ok(this.$('.show-item.is-focused').length, 'is-focused class');
  let href = smsHref(item.id);
  assert.ok(this.$(`a[href="${href}"]`).length, 'user can see SMS link');
});
