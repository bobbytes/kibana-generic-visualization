import request from 'request';

import { env } from './env';
import { KibanaObjectModel } from './kibana-models/kibana-object.model';
import { KibanaObjectsWrapperModel } from './kibana-models/kibana-objects-wrapper.model';
import { createKibanaVisualizationLine } from './lib/create-kibana-visualization-line';

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
    const kibanaVisualizationLine = createKibanaVisualizationLine('Redis Visualization Support Sessions Generated', '989c3260-337e-11e9-8188-49c12b540d78');
    const kibanaObject = new KibanaObjectModel(kibanaVisualizationLine);
    const kibanaObjectWrapper = new KibanaObjectsWrapperModel([kibanaObject]);
    const options = this.options;
    options.body = kibanaObjectWrapper.toString();
    options.url = `${options.url}/import`;

    request(options, this.callback.bind(this));
  }

  private callback(error: any, response: any, body: any): void {
    if (!error && response.statusCode === 200) {
      console.log(body);
    }
  }
}
