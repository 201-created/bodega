/* global ApplePaySession */
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'bodega/tests/helpers/ember-test-selectors';

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
  },
  afterEach() {
    window.Stripe = this._oldStripe;
  }
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{apple-pay-button}}`);

  assert.ok(this.$('button.apple-pay-button').length, 'has button');
});

test('clicking invokes Apple Pay', function(assert) {
  assert.expect(1);

  window.Stripe.applePay.buildSession = function(request, success) {
    let completion = function(status) {
      assert.equal(status, ApplePaySession.STATUS_SUCCESS, 'completion called with success');
    };

    success(null, completion);

    return {
      begin() { return this; }
    };
  };

  this.render(hbs`{{apple-pay-button}}`);

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

  this.render(hbs`{{apple-pay-button}}`);

  this.$('button').click();

  assert.ok(this.$(testSelector('error', message)).length, 'error message');
});
