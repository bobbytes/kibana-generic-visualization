import { VisualizationAggregateEnum } from '../enums/visualization-aggregate-enum';
import { VisualizationSortOrderEnum } from '../enums/visualization-sort-order-enum';

interface IVisualizationAggregationParamsConfig {
  field: string;
  customLabel?: string;
  interval?: string;
  customInterval?: string;
  min_doc_count?: number;
  extended_bounds?: {};
  aggregate?: VisualizationAggregateEnum;
  size?: number;
  sortField?: string;
  sortOrder?: VisualizationSortOrderEnum;
}

export class VisualizationAggregationParamsModel {
  public field: string;
  public customLabel?: string;
  public interval?: string;
  public customInterval?: string;
  public min_doc_count?: number;
  public extended_bounds?: {};
  public aggregate?: VisualizationAggregateEnum;
  public size?: number;
  public sortField?: string;
  public sortOrder?: VisualizationSortOrderEnum;

  constructor(config: IVisualizationAggregationParamsConfig) {
    this.field = config.field;
    this.customLabel = config.customLabel;
    this.interval = config.interval;
    this.customInterval = config.customInterval;
    this.min_doc_count = config.min_doc_count;
    this.extended_bounds = config.extended_bounds;
    this.aggregate = config.aggregate;
    this.size = config.size;
    this.sortField = config.sortField;
    this.sortOrder = config.sortOrder;
  }
}
