import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'bodega/tests/helpers/ember-test-selectors';

moduleForComponent('show-item', 'Integration | Component | show item', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  let item = {id: 1, name: 'my item', url: '/dummy-image', price: 1099};
  this.set('item', item);
  this.render(hbs`{{show-item item=item}}`);

  assert.ok(this.$(testSelector('item', item.id)).length, 'displays item');
  assert.ok(this.$(testSelector('price', item.price / 100)).length, 'displays price');
  assert.ok(this.$(`img[src="${item.url}"]`).length, 'shows image');
});
