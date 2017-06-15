import Controller from 'ember-controller';
import injectService from 'ember-service/inject';
import computed from 'ember-computed';

export default Controller.extend({
  fastboot: injectService(),
  isFastboot: computed.readOnly('fastboot.isFastBoot'),
});
