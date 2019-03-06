interface IVisualizationAggregationParamsConfig {
  field: string;
  customLabel?: string;
  interval?: string;
  customInterval?: string;
  min_doc_count?: number;
  extended_bounds?: {};
}

export class VisualizationAggregationParamsModel {
  public field: string;
  public customLabel?: string;
  public interval?: string;
  public customInterval?: string;
  public min_doc_count?: number;
  public extended_bounds?: {};

  constructor(config: IVisualizationAggregationParamsConfig) {
    this.field = config.field;
    this.customLabel = config.customLabel;
    this.interval = config.interval;
    this.customInterval = config.customInterval;
    this.min_doc_count = config.min_doc_count;
    this.extended_bounds = config.extended_bounds;
  }
}
