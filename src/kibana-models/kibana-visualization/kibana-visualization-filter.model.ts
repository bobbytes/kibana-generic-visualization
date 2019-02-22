export class KibanaVisualizationFilterModel {
  public meta = {
    index: '[logzioCustomerIndex]YYMMDD',
    negate: false,
    disabled: false,
    type: 'phrase',
    key: 'name',
    value: 'taibika-app-support-sessions',
    params: {
      query: 'taibika-app-support-sessions',
      type: 'phrase',
    },
  };

  public query = {
    match: {
      name: {
        query: 'taibika-app-support-sessions',
        type: 'phrase',
      },
    },
  };

  public $state = {
    store: 'appState',
  };
}
