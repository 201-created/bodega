import { click, find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import FakeStripeCheckout from 'bodega/tests/fakes/stripe-checkout';
import FakeRouter from 'bodega/tests/fakes/router';
import run from 'ember-runloop';

module('Integration | Component | stripe checkout', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:stripe-checkout', FakeStripeCheckout);

    run(() => {
      let store = this.owner.lookup('service:store');
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
    });
  });

  test('it renders', async function(assert) {
    await render(hbs`{{stripe-checkout item=item}}`);

    assert.ok(find('button.stripe-checkout__button'), 'has button');
  });

  test('clicking invokes Stripe checkout', async function(assert) {
    this.owner.register('service:router', FakeRouter);
    let router = this.owner.lookup('service:router');

    await render(hbs`{{stripe-checkout item=item}}`);
    await click('button');

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

  test('displays error if charge saving fails', async function(assert) {
    assert.expect(2);

    this.server.post('/charges', { status: 'bad request' }, 500);

    await render(hbs`{{stripe-checkout item=item}} {{modal-message}}`);

    await click('button');

    let status = this.owner.lookup('service:status');
    assert.equal(status.get('errorMessage'), 'Purchase failed', 'error message set on status service');
    assert.ok(find('[data-test-error="Purchase failed"]'), 'user sees error message');
  });
});
