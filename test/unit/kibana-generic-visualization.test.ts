import { GenericKibanaVisualization } from '../../src/kibana-generic-visualization';

describe('GenericKibanaVisualization', () => {
  let genericKibanaVisualization: GenericKibanaVisualization;

  beforeAll(() => {
    genericKibanaVisualization = new GenericKibanaVisualization();
  });

  test('first test', () => {
    expect(genericKibanaVisualization).toBeInstanceOf(GenericKibanaVisualization);

    // genericKibanaVisualization.request();
  });
});
