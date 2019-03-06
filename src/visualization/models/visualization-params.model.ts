import { VisualizationCategoryAxis } from './visualization-category-axis.model';
import { VisualizationSeriesParamModel } from './visualization-series-param.model';

export class VisualizationParamsModel {
  public addLegend: true;
  public addTimeMarker: false;
  public addTooltip: true;
  public categoryAxes: VisualizationCategoryAxis[];
  public grid = {
    categoryLines: false,
    style: {
      color: '#eee',
    },
  };
  public legendPosition: 'right';
  public seriesParams: VisualizationSeriesParamModel[];
  public times: [];
  public type: 'line';
  public valueAxes = [
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
  ];

  constructor(
    categoryAxes: VisualizationCategoryAxis[],
    seriesParams: VisualizationSeriesParamModel[]
  ) {
    this.categoryAxes = categoryAxes;
    this.seriesParams = seriesParams;
  }
}
