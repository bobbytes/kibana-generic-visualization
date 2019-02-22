import request from 'request';

import { env } from './env';
import { KibanaObjectModel } from './kibana-models/kibana-object.model';
import { KibanaObjectsWrapperModel } from './kibana-models/kibana-objects-wrapper.model';
import { KibanaVisualizationAggsModel } from './kibana-models/kibana-visualization-aggs.model';
import {
    KibanaVisualizationCategoryAxis
} from './kibana-models/kibana-visualization-category-axis.model';
import { KibanaVisualizationFilterModel } from './kibana-models/kibana-visualization-filter.model';
import {
    KibanaVisualizationSeriesParamModel
} from './kibana-models/kibana-visualization-series-param.model';
import { KibanaVisualizationModel } from './kibana-models/kibana-visualization.model';
import { SearchSourceJsonModel } from './kibana-models/search-source-json.model';
import { VisualizationStateModel } from './kibana-models/visualization-state.model';

export class GenericKibanaVisualization {
  private headers = {
    'accept': 'application/json',
    'content-type': 'application/json',
    'X-API-TOKEN': env.logzIo.token,
  };

  private options = {
    url: `${env.logzIo.host}/kibana`,
    method: 'POST',
    headers: this.headers,
    body: '',
  };

  public export(): void {
    const options = this.options;
    options.url = `${options.url}/export`;
    options.body = '{"type": "visualization"}';
    request(options, this.callback.bind(this));
  }

  public import(): void {
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
      'Redis Visualization Support Sessions Generated',
      'line',
      [categoryAxis],
      [seriesParams1, seriesParams2]
    );

    const filter = new KibanaVisualizationFilterModel();
    const searchSourceJSON = new SearchSourceJsonModel([filter]);
    const kibanaVisualization = new KibanaVisualizationModel(
      'Redis Visualization Support Sessions Generated',
      visualizationState,
      '989c3260-337e-11e9-8188-49c12b540d78',
      searchSourceJSON
    );
    const kibanaObject = new KibanaObjectModel(kibanaVisualization);
    const body = new KibanaObjectsWrapperModel([kibanaObject]);

    const options = this.options;
    options.body = body.toString();
    options.url = `${options.url}/import`;

    request(options, this.callback.bind(this));
  }

  private callback(error: any, response: any, body: any): void {
    if (!error && response.statusCode === 200) {
      console.log(body);
    }
  }
}
