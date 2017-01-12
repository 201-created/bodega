import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import FakeStripeCheckout from 'bodega/tests/fakes/stripe-checkout';
import FakeRouter from 'bodega/tests/fakes/router';
import startMirage from 'bodega/tests/helpers/setup-mirage-for-integration';
import testSelector from 'bodega/tests/helpers/ember-test-selectors';
import wait from 'ember-test-helpers/wait';

moduleForComponent('stripe-checkout', 'Integration | Component | stripe checkout', {
  integration: true,
  beforeEach() {
    this.server = startMirage(this.container);
    this.register('service:stripe-checkout', FakeStripeCheckout);

    let store = this.container.lookup('service:store');
    store.push({
      data: {
        id: 'item-id',
        type: 'item',
        attributes: {
          price: 1199,
          name: 'Sticker Name'
        }
      }
    });
    this.item = store.peekRecord('item', 'item-id');
  },

  afterEach() {
    this.server.shutdown();
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{stripe-checkout item=item}}`);

  assert.ok(this.$('button.stripe-checkout__button').length, 'has button');
});

test('clicking invokes Stripe checkout', function(assert) {
  this.register('service:router', FakeRouter);
  let router = this.container.lookup('service:router');

  this.render(hbs`{{stripe-checkout item=item}}`);
  this.$('button').click();

  return wait().then(() => {
    assert.ok(this.$(testSelector('success')).length, 'user sees success message');
    assert.equal(this.server.db.charges.length, 1, 'creates a single charge on the server');

    let charge = this.server.schema.charges.first();
    assert.deepEqual(charge.attrs, {
      id: '1',
      description: '201 Created Sticker: Sticker Name',
      token: 'fake-token-id',
      itemId: this.item.id,
      price: this.item.get('price'),
      givenName: 'Barack',
      familyName: 'Obama',
      addressLines: [ '1600 Pennsylvania Ave.' ],
      locality: 'Washington',
      administrativeArea: 'DC',
      postalCode: '20500',
      countryCode: 'US'

    }, 'token ID from Stripe is saved to the charge');

    let [transitionPath, transitionModel] = router.transitions[0];
    assert.equal(transitionPath, 'success', 'tells the router to transition to success route');
    assert.equal(transitionModel.id, charge.id, 'transitions with the charge id');
  });
});

test('displays error if charge saving fails', function(assert) {
  assert.expect(1);

  this.server.post('/charges', { status: 'bad request' }, 500);

  this.render(hbs`{{stripe-checkout item=item}}`);

  this.$('button').click();

  return wait().then(() => {
    assert.ok(this.$(testSelector('error', 'Purchase failed')).length, 'user sees error message');
  });
});
