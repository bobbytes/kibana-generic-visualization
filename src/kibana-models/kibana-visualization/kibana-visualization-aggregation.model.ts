import {
    KibanaVisualizationAggregationSchemaEnum
} from '../../enums/kibana-visualization-aggregation-schema.enum';
import {
    KibanaVisualizationAggregationTypeEnum
} from '../../enums/kibana-visualization-aggregation-type.enum';

interface IKibanaVisualizationAggregationConfig {
  id: string;
  field: string;
  type: KibanaVisualizationAggregationTypeEnum;
  schema: KibanaVisualizationAggregationSchemaEnum;
  customLabel?: string;
  interval?: string;
  customInterval?: string;
  min_doc_count?: number;
  extended_bounds?: {};
}

export class KibanaVisualizationAggregationModel {
  public enabled = true;
  public id: string;
  public type: KibanaVisualizationAggregationTypeEnum;
  public schema: KibanaVisualizationAggregationSchemaEnum;
  public params = {
    field: '',
    customLabel: undefined,
    interval: undefined,
    customInterval: undefined,
    min_doc_count: undefined,
    extended_bounds: undefined,
  };

  constructor(config: IKibanaVisualizationAggregationConfig) {
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
