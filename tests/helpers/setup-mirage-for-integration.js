import mirageInitializer from 'bodega/initializers/ember-cli-mirage';
import getServer from 'bodega/mirage/get-server';

export default function startMirage(container) {
  mirageInitializer.initialize(container);
  return getServer();
}
