import {
    KibanaVisualizationAggregationSchemaEnum
} from './enums/kibana-visualization-aggregation-schema.enum';
import {
    KibanaVisualizationAggregationTypeEnum
} from './enums/kibana-visualization-aggregation-type.enum';
import { env } from './env';
import { KibanaFilterModel } from './kibana-models/kibana-filter.model';
import {
    KibanaVisualizationAggregationModel
} from './kibana-models/kibana-visualization/kibana-visualization-aggregation.model';
import {
    KibanaVisualizationSeriesParamModel
} from './kibana-models/kibana-visualization/kibana-visualization-series-param.model';
import {
    KibanaVisualizationModel
} from './kibana-models/kibana-visualization/kibana-visualization.model';
import {
    createKibanaVisualizationLine, IKibanaVisualizationLineConfig
} from './lib/create-kibana-visualization-line';

class RedisVisualizations {
  private redisServiceNames = [
    'taibika-api-public-revisionguard-3',
    'taibika-api-public-settings-store',
    'taibika-api-revisionguard-3',
    'taibika-app-admin-revisionguard-3',
  ];

  public getRedisVisualizations(): KibanaVisualizationModel[] {
    const redisMemoryVisualizations = this.redisServiceNames.map(serviceName => this.getRedisMemoryVisualization(serviceName));

    return redisMemoryVisualizations;
  }

  private getRedisMemoryVisualization(serviceName: string): KibanaVisualizationModel {
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

    const filter = new KibanaFilterModel('name', serviceName);

    const kibanaVisualizationLineConfig: IKibanaVisualizationLineConfig = {
      title: `Redis ${serviceName} Memory bubu`,
      savedSearchId: env.kibana.savedSearchId,
      aggregations: [timestampAggregation, ...fieldAggregations],
      seriesParams,
      filters: [filter],
    };

    return createKibanaVisualizationLine(kibanaVisualizationLineConfig);
  }
}

export const redisVisualization = new RedisVisualizations();
