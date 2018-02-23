import { helper } from '@ember/component/helper';

export default helper(function(priceInCents) {
  return priceInCents / 100;
});
