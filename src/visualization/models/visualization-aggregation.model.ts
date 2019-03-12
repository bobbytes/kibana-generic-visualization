import { VisualizationAggregationSchemaEnum } from '../enums/visualization-aggregation-schema.enum';
import { VisualizationAggregationTypeEnum } from '../enums/visualization-aggregation-type.enum';
import { VisualizationAggregationParamsModel } from './visualization-aggregation-params.model';

interface IVisualizationAggregationConfig {
  id: string;
  type: VisualizationAggregationTypeEnum;
  schema: VisualizationAggregationSchemaEnum;
  params: VisualizationAggregationParamsModel;
}

export class VisualizationAggregationModel {
  public enabled = true;
  public id: string;
  public type: VisualizationAggregationTypeEnum;
  public schema: VisualizationAggregationSchemaEnum;
  public params: VisualizationAggregationParamsModel;

  constructor(config: IVisualizationAggregationConfig) {
    this.id = config.id;
    this.type = config.type;
    this.schema = config.schema;
    this.params = config.params;
  }
}
