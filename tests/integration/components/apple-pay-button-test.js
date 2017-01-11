/* global ApplePaySession */
import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'bodega/tests/helpers/ember-test-selectors';
import startMirage from 'bodega/tests/helpers/setup-mirage-for-integration';
import wait from 'ember-test-helpers/wait';

import Ember from 'ember';
const { Service, Object: emberObject } = Ember;

moduleForComponent('apple-pay-button', 'Integration | Component | apple pay button', {
  integration: true,
  beforeEach() {
    this.server = startMirage(this.container);
    this._oldStripe = window.Stripe;

    window.Stripe = {
      applePay: {
        checkAvailability(callback) {
          callback(true);
        }
      }
    };

    this.item = emberObject.create({ price: 1199 });

    this.server.post('https://localhost.ssl:3000/api/charges', { success: true });
  },
  afterEach() {
    window.Stripe = this._oldStripe;
    this.server.shutdown();
  }
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{apple-pay-button item=item}}`);

  assert.ok(this.$('button.apple-pay-button').length, 'has button');
});

skip('clicking invokes Apple Pay', function(assert) {
  assert.expect(5);

  this.server.post('/charges', function(scema, request) {
    assert.ok(true, 'post to /api/charges');
    let data = JSON.parse(request.requestBody);
    data.data.id = '1';
    return data;
  });

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

  let RouterStub = Service.extend({
    router: {
      transitionTo(route /* , model */) {
        assert.equal(route, 'success', 'transitioned to success');
      }
    }
  });
  this.register('service:router', RouterStub);

  this.render(hbs`{{apple-pay-button item=item}}`);
  this.$('button').click();

  return wait().then(() => {
    assert.ok(this.$(testSelector('success')).length, 'success message');
  });
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
