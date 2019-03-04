import { VisualizationStateTypeEnum } from '../enums/visualization-state-type.enum';
import { VisualizationAggregationModel } from './visualization-aggregation.model';
import { VisualizationCategoryAxis } from './visualization-category-axis.model';
import { VisualizationSeriesParamModel } from './visualization-series-param.model';

export class VisualizationStateModel {
  public aggs: VisualizationAggregationModel[] = [];
  public params = {
    addLegend: true,
    addTimeMarker: false,
    addTooltip: true,
    categoryAxes: [],
    grid: {
      categoryLines: false,
      style: {
        color: '#eee',
      },
    },
    legendPosition: 'right',
    seriesParams: [],
    times: [],
    type: 'line',
    valueAxes: [
      {
        id: 'ValueAxis-1',
        labels: {
          filter: false,
          rotate: 0,
          show: true,
          truncate: 100,
        },
        name: 'LeftAxis-1',
        position: 'left',
        scale: {
          mode: 'normal',
          type: 'linear',
        },
        show: true,
        style: {},
        title: {
          text: 'Count',
        },
        type: 'value',
      },
    ],
  };
  public type: string;

  constructor(
    aggregations: VisualizationAggregationModel[],
    visualizationStateType: VisualizationStateTypeEnum,
    categoryAxes: VisualizationCategoryAxis[],
    seriesParams: VisualizationSeriesParamModel[]
  ) {
    this.aggs = aggregations;
    this.type = visualizationStateType;
    this.params.categoryAxes = categoryAxes;
    this.params.seriesParams = seriesParams;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}
