import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('item-details', 'Integration | Component | item details', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  let item = {id: 1, name: 'my item', url: '/dummy-image', price: 1099};
  this.set('item', item);
  this.render(hbs`{{item-details item=item}}`);

  assert.ok(find(`[data-test-name="${item.name}"]`), 'displays name');
  assert.ok(find(`[data-test-price="${item.price / 100}"]`), 'displays price');
});
