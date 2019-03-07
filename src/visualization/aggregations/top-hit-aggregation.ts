import { VisualizationAggregateEnum } from '../enums/visualization-aggregate-enum';
import { VisualizationAggregationSchemaEnum } from '../enums/visualization-aggregation-schema.enum';
import { VisualizationAggregationTypeEnum } from '../enums/visualization-aggregation-type.enum';
import { VisualizationSortOrderEnum } from '../enums/visualization-sort-order-enum';
import {
    VisualizationAggregationParamsModel
} from '../models/visualization-aggregation-params.model';
import { VisualizationAggregationModel } from '../models/visualization-aggregation.model';

export const getTopHitAggregation = (id: string, field: string, customLabel: string): VisualizationAggregationModel => {
  const fieldAggregationParams = new VisualizationAggregationParamsModel({
    field,
    customLabel,
    aggregate: VisualizationAggregateEnum.Concat,
    size: 1,
    sortField: '@timestamp',
    sortOrder: VisualizationSortOrderEnum.Descending,
  });

  return new VisualizationAggregationModel({
    id,
    type: VisualizationAggregationTypeEnum.TopHits,
    schema: VisualizationAggregationSchemaEnum.Metric,
    params: fieldAggregationParams,
  });
};
