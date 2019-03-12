import { VisualizationStateTypeEnum } from '../enums/visualization-state-type.enum';
import { VisualizationAggregationModel } from './visualization-aggregation.model';
import { VisualizationCategoryAxis } from './visualization-category-axis.model';
import { VisualizationParamsModel } from './visualization-params.model';
import { VisualizationSeriesParamModel } from './visualization-series-param.model';

export class VisualizationStateModel {
  public aggs: VisualizationAggregationModel[] = [];
  public params: VisualizationParamsModel;
  public type: string;

  constructor(
    aggregations: VisualizationAggregationModel[],
    visualizationStateType: VisualizationStateTypeEnum,
    params: VisualizationParamsModel
  ) {
    this.aggs = aggregations;
    this.type = visualizationStateType;
    this.params = params;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}
