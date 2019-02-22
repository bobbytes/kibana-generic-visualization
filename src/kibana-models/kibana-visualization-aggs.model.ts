interface IKibanaVisualizationAggConfig {
  id: string;
  field: string;
  type: string;
  schema: string;
  customLabel?: string;
  interval?: string;
  customInterval?: string;
  min_doc_count?: number;
  extended_bounds?: {};
}

export class KibanaVisualizationAggsModel {
  public enabled = true;
  public id: string;
  public type: string;
  public schema: string;
  public params = {
    field: '',
    customLabel: undefined,
    interval: undefined,
    customInterval: undefined,
    min_doc_count: undefined,
    extended_bounds: undefined,
  };

  constructor(config: IKibanaVisualizationAggConfig) {
    this.id = config.id;
    this.type = config.type;
    this.schema = config.schema;
    this.params.field = config.field;
    this.params.customLabel = config.customLabel;
    this.params.interval = config.interval;
    this.params.customInterval = config.customInterval;
    this.params.min_doc_count = config.min_doc_count;
    this.params.extended_bounds = config.extended_bounds;
  }
}
