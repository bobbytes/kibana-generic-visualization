import {
    KibanaVisualizationAggregationSchemaEnum
} from '../enums/kibana-visualization-aggregation-schema.enum';
import {
    KibanaVisualizationAggregationTypeEnum
} from '../enums/kibana-visualization-aggregation-type.enum';
import {
    KibanaVisualizationAggregationModel
} from '../kibana-models/kibana-visualization/kibana-visualization-aggregation.model';
import {
    KibanaVisualizationSeriesParamModel
} from '../kibana-models/kibana-visualization/kibana-visualization-series-param.model';
import {
    createKibanaVisualizationLine, IKibanaVisualizationLineConfig
} from './create-kibana-visualization-line';

export const createKibanaVisualizationRedis = (title: string, savedSearchId: string) => {
  const fields = [
    { fieldName: 'metrics.used_memory', customLabel: 'Used Memory' },
    { fieldName: 'metrics.used_memory_rss', customLabel: 'Used Memory RSS' },
  ];

  const timestampAggregation = new KibanaVisualizationAggregationModel({
    id: '1',
    field: '@timestamp',
    type: KibanaVisualizationAggregationTypeEnum.DateHistogram,
    schema: KibanaVisualizationAggregationSchemaEnum.Segment,
    interval: 'auto',
    customInterval: '2h',
    min_doc_count: 1,
    extended_bounds: {},
  });

  const fieldAggregations = fields.map((field, index) => {
    return new KibanaVisualizationAggregationModel({
      id: `${index + 1}`,
      field: field.fieldName,
      type: KibanaVisualizationAggregationTypeEnum.Max,
      schema: KibanaVisualizationAggregationSchemaEnum.Metric,
      customLabel: field.customLabel,
    });
  });

  const seriesParams = fields.map((field, index) => new KibanaVisualizationSeriesParamModel(`${index + 1}`, field.customLabel));

  const kibanaVisualizationLineConfig: IKibanaVisualizationLineConfig = {
    title,
    savedSearchId,
    aggregations: [timestampAggregation, ...fieldAggregations],
    seriesParams,
  };

  return createKibanaVisualizationLine(kibanaVisualizationLineConfig);
};
