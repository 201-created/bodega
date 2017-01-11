import DS from 'ember-data';

export default DS.Model.extend({
  price: DS.attr('number'),
  token: DS.attr(),
  item: DS.belongsTo(),
  description: DS.attr(),
  givenName: DS.attr(),
  familyName: DS.attr(),
  emailAddress: DS.attr(),
  addressLines: DS.attr(),
  locality: DS.attr(),
  administrativeArea: DS.attr(),
  postalCode: DS.attr(),
  countryCode: DS.attr()
});
