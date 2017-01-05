import DS from 'ember-data';

export default DS.Model.extend({
  price: DS.attr('number'),
  token: DS.attr(),
  item: DS.belongsTo(),
  shippingContact: DS.attr()
});
