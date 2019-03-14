import { KibanaGenericVisualization } from '../../../src/kibana-generic-visualization';

describe('bubu', () => {
  let kibanaGenericVisualization: KibanaGenericVisualization;

  test('bubu test', () => {
    kibanaGenericVisualization = new KibanaGenericVisualization({
      kibanaVersion: '6.3.2',
      api: { token: 'very-secret', host: 'bubu-host' },
    });

    expect(kibanaGenericVisualization).toBeInstanceOf(KibanaGenericVisualization);
  });
});
