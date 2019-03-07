import { VisualizationAggregationSchemaEnum } from '../enums/visualization-aggregation-schema.enum';
import { VisualizationAggregationTypeEnum } from '../enums/visualization-aggregation-type.enum';
import {
    VisualizationAggregationParamsModel
} from '../models/visualization-aggregation-params.model';
import { VisualizationAggregationModel } from '../models/visualization-aggregation.model';

export const getMaxAggregation = (id: string, field: string, customLabel: string): VisualizationAggregationModel => {
  const fieldAggregationParams = new VisualizationAggregationParamsModel({
    field,
    customLabel,
  });

  return new VisualizationAggregationModel({
    id,
    type: VisualizationAggregationTypeEnum.Max,
    schema: VisualizationAggregationSchemaEnum.Metric,
    params: fieldAggregationParams,
  });
};
