import { VisualizationAggregationSchemaEnum } from '../enums/visualization-aggregation-schema.enum';
import { VisualizationAggregationTypeEnum } from '../enums/visualization-aggregation-type.enum';
import { VisualizationCustomIntervalEnum } from '../enums/visualization-custom-interval.enum';
import { VisualizationIntervalEnum } from '../enums/visualization-interval.enum';
import {
    VisualizationAggregationParamsModel
} from '../models/visualization-aggregation-params.model';
import { VisualizationAggregationModel } from '../models/visualization-aggregation.model';

export const getDateHistogramAggregation = (id: string): VisualizationAggregationModel => {
  const aggregationParams = new VisualizationAggregationParamsModel({
    field: '@timestamp',
    interval: VisualizationIntervalEnum.Auto,
    customInterval: VisualizationCustomIntervalEnum.TwoHours,
    min_doc_count: 1,
    extended_bounds: {},
  });

  return new VisualizationAggregationModel({
    id,
    type: VisualizationAggregationTypeEnum.DateHistogram,
    schema: VisualizationAggregationSchemaEnum.Segment,
    params: aggregationParams,
  });
};
