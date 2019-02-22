export class KibanaVisualizationFilterModel {
  public meta = {
    index: '[logzioCustomerIndex]YYMMDD',
    negate: false,
    disabled: false,
    type: 'phrase',
    key: 'name',
    value: '',
    params: {
      query: '',
      type: 'phrase',
    },
  };

  public query = {
    match: {
      name: {
        query: '',
        type: 'phrase',
      },
    },
  };

  public $state = {
    store: 'appState',
  };

  constructor(key: string, value: string) {
    this.meta.key = key;
    this.meta.value = value;
    this.meta.params.query = value;
    this.query.match.name.query = value;
  }
}
