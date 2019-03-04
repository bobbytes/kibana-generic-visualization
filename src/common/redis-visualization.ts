import { env } from '../env';
import {
    createVisualizationLine, IVisualizationLineConfig
} from '../lib/create-visualization-line';
import {
    VisualizationAggregationSchemaEnum
} from '../visualization/enums/visualization-aggregation-schema.enum';
import {
    VisualizationAggregationTypeEnum
} from '../visualization/enums/visualization-aggregation-type.enum';
import {
    VisualizationAggregationModel
} from '../visualization/models/visualization-aggregation.model';
import {
    VisualizationSeriesParamModel
} from '../visualization/models/visualization-series-param.model';
import { VisualizationModel } from '../visualization/models/visualization.model';
import { FilterModel } from './models/filter.model';

class RedisVisualizations {
  private redisServiceNames = [
    'taibika-api-public-revisionguard-3',
    'taibika-api-public-settings-store',
    'taibika-api-revisionguard-3',
    'taibika-app-admin-revisionguard-3',
  ];

  public getRedisVisualizations(): VisualizationModel[] {
    const redisMemoryVisualizations = this.redisServiceNames.map(serviceName => this.getRedisMemoryVisualization(serviceName));

    return redisMemoryVisualizations;
  }

  private getRedisMemoryVisualization(serviceName: string): VisualizationModel {
    const fields = [
      { fieldName: 'metrics.used_memory', customLabel: 'Used Memory' },
      { fieldName: 'metrics.used_memory_rss', customLabel: 'Used Memory RSS' },
    ];

    const timestampAggregation = new VisualizationAggregationModel({
      id: '1',
      field: '@timestamp',
      type: VisualizationAggregationTypeEnum.DateHistogram,
      schema: VisualizationAggregationSchemaEnum.Segment,
      interval: 'auto',
      customInterval: '2h',
      min_doc_count: 1,
      extended_bounds: {},
    });

    const fieldAggregations = fields.map((field, index) => {
      return new VisualizationAggregationModel({
        id: `${index + 1}`,
        field: field.fieldName,
        type: VisualizationAggregationTypeEnum.Max,
        schema: VisualizationAggregationSchemaEnum.Metric,
        customLabel: field.customLabel,
      });
    });

    const seriesParams = fields.map((field, index) => new VisualizationSeriesParamModel(`${index + 1}`, field.customLabel));

    const filter = new FilterModel('name', serviceName);

    const kibanaVisualizationLineConfig: IVisualizationLineConfig = {
      title: `Redis ${serviceName} Memory bubu`,
      savedSearchId: env.kibana.savedSearchId,
      aggregations: [timestampAggregation, ...fieldAggregations],
      seriesParams,
      filters: [filter],
    };

    return createVisualizationLine(kibanaVisualizationLineConfig);
  }
}

export const redisVisualization = new RedisVisualizations();
