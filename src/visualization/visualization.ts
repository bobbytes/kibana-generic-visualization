import { ObjectTypeEnum } from '../common/enums/object-id-prefix.enum';
import { FilterModel } from '../common/models/filter.model';
import { env } from '../env';
import { kibanaConnector, TKibanaResponse } from '../lib/kibana-connector';
import { getDateHistogramAggregation } from './aggregations/date-histogram-aggregation';
import { getMaxAggregation } from './aggregations/max-aggregation';
import { getTopHitAggregation } from './aggregations/top-hit-aggregation';
import { VisualizationLegendPositionEnum } from './enums/visualization-legend-position.enum';
import { VisualizationParamsTypeEnum } from './enums/visualization-params-type.enum';
import { VisualizationStateTypeEnum } from './enums/visualization-state-type.enum';
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
    switch (stateType) {
      case VisualizationStateTypeEnum.Line:
        return [
          getDateHistogramAggregation('1'),
          ...fields.map((field, index) => getMaxAggregation(`${index + 1}`, field.fieldName, field.customLabel)),
        ];
      case VisualizationStateTypeEnum.Metric:
        return fields.map((field, index) => getTopHitAggregation(`${index + 1}`, field.fieldName, field.customLabel));
      default:
        return [];
    }
  }
}
