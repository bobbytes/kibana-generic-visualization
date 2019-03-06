import { ObjectTypeEnum } from '../common/enums/object-id-prefix.enum';
import { FilterModel } from '../common/models/filter.model';
import { env } from '../env';
import { kibanaConnector, TKibanaResponse } from '../lib/kibana-connector';
import { VisualizationAggregationSchemaEnum } from './enums/visualization-aggregation-schema.enum';
import { VisualizationAggregationTypeEnum } from './enums/visualization-aggregation-type.enum';
import { VisualizationCustomIntervalEnum } from './enums/visualization-custom-interval.enum';
import { VisualizationIntervalEnum } from './enums/visualization-interval.enum';
import { VisualizationLegendPositionEnum } from './enums/visualization-legend-position.enum';
import { VisualizationParamsTypeEnum } from './enums/visualization-params-type.enum';
import { VisualizationStateTypeEnum } from './enums/visualization-state-type.enum';
import { showDateHistogramAggregationMap } from './mappers/show-date-histogram-aggregation.map';
import {
    VisualizationAggregationParamsModel
} from './models/visualization-aggregation-params.model';
import { VisualizationAggregationModel } from './models/visualization-aggregation.model';
import { VisualizationCategoryAxis } from './models/visualization-category-axis.model';
import { VisualizationParamsGridModel } from './models/visualization-params-grid.model';
import { VisualizationParamsModel } from './models/visualization-params.model';
import { VisualizationSeriesParamModel } from './models/visualization-series-param.model';
import { VisualizationStateModel } from './models/visualization-state.model';
import { VisualizationValueAxis } from './models/visualization-value-axis';
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
    const aggregations = this.getAggregations(stateType, fields);

    const seriesParams = fields.map((field, index) => new VisualizationSeriesParamModel(`${index + 1}`, field.customLabel));
    const filters = [new FilterModel('name', serviceName)];
    const categoryAxes = [new VisualizationCategoryAxis()];
    const grid = new VisualizationParamsGridModel();
    const params = new VisualizationParamsModel({
      categoryAxes,
      seriesParams,
      grid,
      legendPosition: VisualizationLegendPositionEnum.Right,
      type: VisualizationParamsTypeEnum.Line,
      valueAxes: [new VisualizationValueAxis()],
      addLegend: true,
      addTooltip: true,
      addTimeMarker: false,
    });

    const visualizationState = new VisualizationStateModel(aggregations, stateType, params);

    return new VisualizationModel(
      title(serviceName),
      visualizationState,
      env.kibana.savedSearchId,
      filters
    );
  }

  private getAggregations(stateType: VisualizationStateTypeEnum, fields: IField[]): VisualizationAggregationModel[] {
    const aggregationParams = new VisualizationAggregationParamsModel({
      field: '@timestamp',
      interval: VisualizationIntervalEnum.Auto,
      customInterval: VisualizationCustomIntervalEnum.TwoHours,
      min_doc_count: 1,
      extended_bounds: {},
    });

    const dateHistogramAggregation = new VisualizationAggregationModel({
      id: '1',
      type: VisualizationAggregationTypeEnum.DateHistogram,
      schema: VisualizationAggregationSchemaEnum.Segment,
      params: aggregationParams,
    });

    const fieldAggregations = fields.map((field, index) => {
      const fieldAggregationParams = new VisualizationAggregationParamsModel({
        field: field.fieldName,
        customLabel: field.customLabel,
      });

      return new VisualizationAggregationModel({
        id: `${index + 1}`,
        type: VisualizationAggregationTypeEnum.Max,
        schema: VisualizationAggregationSchemaEnum.Metric,
        params: fieldAggregationParams,
      });
    });

    const showDateHistogram = showDateHistogramAggregationMap.get(stateType);

    return showDateHistogram ? [dateHistogramAggregation, ...fieldAggregations] : fieldAggregations;
  }
}
