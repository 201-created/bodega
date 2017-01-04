/* global ApplePaySession */
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'bodega/tests/helpers/ember-test-selectors';
import Ember from 'ember';
const { Object: emberObject } = Ember;

moduleForComponent('apple-pay-button', 'Integration | Component | apple pay button', {
  integration: true,
  beforeEach() {
    this._oldStripe = window.Stripe;

    window.Stripe = {
      applePay: {
        checkAvailability(callback) {
          callback(true);
        }
      }
    };

    this.item = emberObject.create({ price: 11.99 });
  },
  afterEach() {
    window.Stripe = this._oldStripe;
  }
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{apple-pay-button item=item}}`);

  assert.ok(this.$('button.apple-pay-button').length, 'has button');
});

test('clicking invokes Apple Pay', function(assert) {
  assert.expect(2);

  window.Stripe.applePay.buildSession = function(request, success) {
    assert.equal(request.total.amount, '11.99', 'price off item sent to Stripe');
    let completion = function(status) {
      assert.equal(status, ApplePaySession.STATUS_SUCCESS, 'completion called with success');
    };

    success({
      token: {
        id: 123
      }
    }, completion);

    return {
      begin() { return this; }
    };
  };

  this.render(hbs`{{apple-pay-button item=item}}`);

  this.$('button').click();
});

test('displays Apple Pay errors', function(assert) {
  assert.expect(1);
  const message = 'bad request';
  window.Stripe.applePay.buildSession = function(request, success, failure) {
    failure({ message });

    return {
      begin() { return this; }
    };
  };

  this.render(hbs`{{apple-pay-button item=item}}`);

  this.$('button').click();

  assert.ok(this.$(testSelector('error', message)).length, 'error message');
});
