import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) { return `sticker ${i+1}`; },
  url() {
    return `http://lorempixel.com/400/200/abstract/${this.name}`;
  },
  price() {
    return 199;
  }
});
