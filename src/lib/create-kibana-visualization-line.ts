import {
    KibanaVisualizationAggsModel
} from '../kibana-models/kibana-visualization/kibana-visualization-aggs.model';
import {
    KibanaVisualizationCategoryAxis
} from '../kibana-models/kibana-visualization/kibana-visualization-category-axis.model';
import {
    KibanaVisualizationFilterModel
} from '../kibana-models/kibana-visualization/kibana-visualization-filter.model';
import {
    KibanaVisualizationSearchSourceJsonModel
} from '../kibana-models/kibana-visualization/kibana-visualization-search-source-json.model';
import {
    KibanaVisualizationSeriesParamModel
} from '../kibana-models/kibana-visualization/kibana-visualization-series-param.model';
import {
    KibanaVisualizationModel
} from '../kibana-models/kibana-visualization/kibana-visualization.model';
import {
    VisualizationStateModel
} from '../kibana-models/kibana-visualization/visualization-state.model';

export const createKibanaVisualizationLine = (title: string, savedSearchId: string) => {
  const aggs1 = new KibanaVisualizationAggsModel({
    id: '2',
    field: '@timestamp',
    type: 'date_histogram',
    schema: 'segment',
    interval: 'auto',
    customInterval: '2h',
    min_doc_count: 1,
    extended_bounds: {},
  });

  const aggs2 = new KibanaVisualizationAggsModel({
    id: '3',
    field: 'metrics.used_memory',
    type: 'max',
    schema: 'metric',
    customLabel: 'Used Memory',
  });

  const aggs3 = new KibanaVisualizationAggsModel({
    id: '4',
    field: 'metrics.used_memory_rss',
    type: 'max',
    schema: 'metric',
    customLabel: 'Used Memory RSS',
  });

  const categoryAxis = new KibanaVisualizationCategoryAxis();

  const seriesParams1 = new KibanaVisualizationSeriesParamModel('3', 'Used Memory');
  const seriesParams2 = new KibanaVisualizationSeriesParamModel('4', 'Used Memory RSS');

  const visualizationState = new VisualizationStateModel(
    [aggs1, aggs2, aggs3],
    'line',
    [categoryAxis],
    [seriesParams1, seriesParams2]
  );

  const filter = new KibanaVisualizationFilterModel();

  const searchSourceJSON = new KibanaVisualizationSearchSourceJsonModel([filter]);

  return new KibanaVisualizationModel(
    title,
    visualizationState,
    savedSearchId,
    searchSourceJSON
  );
};
