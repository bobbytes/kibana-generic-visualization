import { VisualizationLegendPositionEnum } from '../enums/visualization-legend-position.enum';
import { VisualizationParamsTypeEnum } from '../enums/visualization-params-type.enum';
import { VisualizationCategoryAxis } from './visualization-category-axis.model';
import { VisualizationMetricModel } from './visualization-metric-model';
import { VisualizationParamsGridModel } from './visualization-params-grid.model';
import { VisualizationSeriesParamModel } from './visualization-series-param.model';
import { VisualizationValueAxis } from './visualization-value-axis';

interface IVisualizationParamsConfig {
  addLegend: boolean;
  addTooltip: boolean;
  addTimeMarker?: boolean;
  categoryAxes?: VisualizationCategoryAxis[];
  grid?: VisualizationParamsGridModel;
  legendPosition?: VisualizationLegendPositionEnum;
  seriesParams?: VisualizationSeriesParamModel[];
  type?: VisualizationParamsTypeEnum;
  valueAxes?: VisualizationValueAxis[];
  metric?: VisualizationMetricModel;
}

export class VisualizationParamsModel {
  public addLegend: boolean;
  public addTooltip: boolean;
  public addTimeMarker?: boolean;
  public categoryAxes?: VisualizationCategoryAxis[];
  public grid?: VisualizationParamsGridModel;
  public legendPosition?: VisualizationLegendPositionEnum;
  public seriesParams?: VisualizationSeriesParamModel[];
  public times?: [];
  public type?: VisualizationParamsTypeEnum;
  public valueAxes?: VisualizationValueAxis[];
  public metric?: VisualizationMetricModel;

  constructor(config: IVisualizationParamsConfig) {
    this.addLegend = config.addLegend;
    this.addTooltip = config.addTooltip;
    this.addTimeMarker = config.addTimeMarker;
    this.categoryAxes = config.categoryAxes;
    this.grid = config.grid;
    this.legendPosition = config.legendPosition;
    this.seriesParams = config.seriesParams;
    this.type = config.type;
    this.valueAxes = config.valueAxes;
    this.metric = config.metric;
  }
}
