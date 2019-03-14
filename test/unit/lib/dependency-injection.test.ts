import { injector } from '../../../src/lib/dependency-injection';
import { KibanaConnector } from '../../../src/lib/kibana-connector';
import { Visualization } from '../../../src/visualization/visualization';

describe('Injector', () => {
  test('KibanaConnector must be injected to Visualization', () => {
    const visualization = injector.resolve<Visualization>(Visualization);

    expect(visualization).toBeInstanceOf(Visualization);
    expect(visualization.kibanaConnector).toBeInstanceOf(KibanaConnector);
  });
});
