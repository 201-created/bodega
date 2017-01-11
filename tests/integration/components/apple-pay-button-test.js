import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'bodega/tests/helpers/ember-test-selectors';
import startMirage from 'bodega/tests/helpers/setup-mirage-for-integration';
import wait from 'ember-test-helpers/wait';
import FakeApplePay from 'bodega/tests/fakes/apple-pay';
import FakeRouter from 'bodega/tests/fakes/router';

moduleForComponent('apple-pay-button', 'Integration | Component | apple pay button', {
  integration: true,

  beforeEach() {
    this.server = startMirage(this.container);
    this.register('service:apple-pay', FakeApplePay);
    this.applePay = this.container.lookup('service:apple-pay');

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
  this.render(hbs`{{apple-pay-button item=item}}`);

  assert.ok(this.$('button.apple-pay-button').length, 'has button');
});

test('clicking invokes Apple Pay', function(assert) {
  assert.expect(7);

  this.register('service:router', FakeRouter);
  let router = this.container.lookup('service:router');

  this.render(hbs`{{apple-pay-button item=item}}`);
  this.$('button').click();

  return wait().then(() => {
    assert.ok(this.$(testSelector('success')).length, 'user sees success message');

    assert.deepEqual(this.applePay.chargesSent, [{
      countryCode: "US",
      currencyCode: "USD",
      requiredShippingContactFields: [
        "email",
        "postalAddress"
      ],
      total: {
        "amount": "11.99",
        "label": "Stripe.com"
      }
    }], 'Sends correct payment details to payment gateway');

    assert.deepEqual(this.applePay.notificationsSent, ['success'], 'sends a single success notification to Apple Pay');
    assert.equal(this.server.db.charges.length, 1, 'creates a single charge on the server');

    let charge = this.server.schema.charges.first();
    assert.deepEqual(charge.attrs, {
      id: '1',
      description: '201 Created Sticker: Sticker Name',
      token: 'fake-token-id',
      itemId: this.item.id,
      price: this.item.get('price')
    }, 'token ID from Stripe is saved to the charge');

    let [transitionPath, transitionModel] = router.transitions[0];
    assert.equal(transitionPath, 'success', 'tells the router to transition to success route');
    assert.equal(transitionModel.id, charge.id, 'transitions with the charge id');
  });
});

test('displays Apple Pay errors', function(assert) {
  assert.expect(1);

  this.applePay.rejectWith('bad request');

  this.render(hbs`{{apple-pay-button item=item}}`);

  this.$('button').click();

  assert.ok(this.$(testSelector('error', 'bad request')).length, 'error message');
});
