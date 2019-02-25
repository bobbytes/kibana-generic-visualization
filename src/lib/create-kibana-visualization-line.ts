import { KibanaVisualizationType } from '../enums/kibana-visualization-state-type.enum';
import { KibanaFilterModel } from '../kibana-models/kibana-filter.model';
import {
    KibanaVisualizationAggregationModel
} from '../kibana-models/kibana-visualization/kibana-visualization-aggregation.model';
import {
    KibanaVisualizationCategoryAxis
} from '../kibana-models/kibana-visualization/kibana-visualization-category-axis.model';
import {
    KibanaVisualizationSeriesParamModel
} from '../kibana-models/kibana-visualization/kibana-visualization-series-param.model';
import {
    KibanaVisualizationModel
} from '../kibana-models/kibana-visualization/kibana-visualization.model';
import {
    VisualizationStateModel
} from '../kibana-models/kibana-visualization/visualization-state.model';

export interface IKibanaVisualizationLineConfig {
  title: string;
  savedSearchId: string;
  aggregations: KibanaVisualizationAggregationModel[];
  seriesParams: KibanaVisualizationSeriesParamModel[];
  filters: KibanaFilterModel[];
}

export const createKibanaVisualizationLine = (config: IKibanaVisualizationLineConfig) => {
  const categoryAxis = new KibanaVisualizationCategoryAxis();

  const visualizationState = new VisualizationStateModel(
    config.aggregations,
    KibanaVisualizationType.Line,
    [categoryAxis],
    config.seriesParams
  );

  return new KibanaVisualizationModel(
    config.title,
    visualizationState,
    config.savedSearchId,
    config.filters
  );
};
