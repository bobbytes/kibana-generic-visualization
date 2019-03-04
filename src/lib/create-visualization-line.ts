import { FilterModel } from '../common/models/filter.model';
import { VisualizationStateTypeEnum } from '../visualization/enums/visualization-state-type.enum';
import {
    VisualizationAggregationModel
} from '../visualization/models/visualization-aggregation.model';
import {
    VisualizationCategoryAxis
} from '../visualization/models/visualization-category-axis.model';
import {
    VisualizationSeriesParamModel
} from '../visualization/models/visualization-series-param.model';
import { VisualizationStateModel } from '../visualization/models/visualization-state.model';
import { VisualizationModel } from '../visualization/models/visualization.model';

export interface IVisualizationLineConfig {
  title: string;
  savedSearchId: string;
  aggregations: VisualizationAggregationModel[];
  seriesParams: VisualizationSeriesParamModel[];
  filters: FilterModel[];
}

export const createVisualizationLine = (config: IVisualizationLineConfig) => {
  const categoryAxis = new VisualizationCategoryAxis();

  const visualizationState = new VisualizationStateModel(
    config.aggregations,
    VisualizationStateTypeEnum.Line,
    [categoryAxis],
    config.seriesParams
  );

  return new VisualizationModel(
    config.title,
    visualizationState,
    config.savedSearchId,
    config.filters
  );
};
