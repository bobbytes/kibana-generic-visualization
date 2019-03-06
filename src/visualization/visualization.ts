import { ObjectTypeEnum } from '../common/enums/object-id-prefix.enum';
import { FilterModel } from '../common/models/filter.model';
import { env } from '../env';
import { kibanaConnector, TKibanaResponse } from '../lib/kibana-connector';
import { VisualizationAggregationSchemaEnum } from './enums/visualization-aggregation-schema.enum';
import { VisualizationAggregationTypeEnum } from './enums/visualization-aggregation-type.enum';
import { VisualizationStateTypeEnum } from './enums/visualization-state-type.enum';
import { VisualizationAggregationModel } from './models/visualization-aggregation.model';
import { VisualizationCategoryAxis } from './models/visualization-category-axis.model';
import { VisualizationParamsModel } from './models/visualization-params.model';
import { VisualizationSeriesParamModel } from './models/visualization-series-param.model';
import { VisualizationStateModel } from './models/visualization-state.model';
import { VisualizationModel } from './models/visualization.model';

interface IField {
  fieldName: string;
  customLabel: string;
}

type TVisualizationTitle = (serviceName: string) => string;

export class Visualization {
  private serviceNames: string[];

  constructor(serviceNames: string[]) {
    this.serviceNames = serviceNames;
  }

  public getVisualizations(stateType: VisualizationStateTypeEnum, title: TVisualizationTitle, fields: IField[]): VisualizationModel[] {
    return this.serviceNames
      .map(serviceName => this.getVisualization(serviceName, stateType, title, fields));
  }

  public createVisualizations(visualizations: VisualizationModel[]): TKibanaResponse {
    return kibanaConnector.setKibanaObject<VisualizationModel>(ObjectTypeEnum.Visualization, visualizations);
  }

  private getVisualization(serviceName: string, stateType: VisualizationStateTypeEnum, title: TVisualizationTitle, fields: IField[]): VisualizationModel {
    const aggregations = this.getAggregations(fields);
    const seriesParams = fields.map((field, index) => new VisualizationSeriesParamModel(`${index + 1}`, field.customLabel));
    const filters = [new FilterModel('name', serviceName)];
    const categoryAxes = [new VisualizationCategoryAxis()];
    const params = new VisualizationParamsModel(categoryAxes, seriesParams);
    const visualizationState = new VisualizationStateModel(aggregations, stateType, params);

    return new VisualizationModel(
      title(serviceName),
      visualizationState,
      env.kibana.savedSearchId,
      filters
    );
  }

  private getAggregations(fields: IField[]): VisualizationAggregationModel[] {
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

    return [timestampAggregation, ...fieldAggregations];
  }
}
