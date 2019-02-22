import request from 'request';
import { isArray } from 'util';

import { KibanaObjectIdPrefixEnum } from '../enums/kibana-object-id-prefix.enum';
import { env } from '../env';
import { KibanaObjectModel } from '../kibana-models/kibana-object.model';
import { KibanaObjectsWrapperModel } from '../kibana-models/kibana-objects-wrapper.model';

class KibanaConnector {
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

  public getKibanaObject(): void {
    const options = this.options;
    options.url = `${options.url}/export`;
    options.body = '{"type": "visualization"}';

    request(options, this.callback.bind(this));
  }

  public setKibanaObject<T>(idPrefix: KibanaObjectIdPrefixEnum, source: T | T[]): void {
    const kibanaObjects = isArray(source)
      ? source.map(s => new KibanaObjectModel<T>(idPrefix, s))
      : [new KibanaObjectModel<T>(idPrefix, source)];

    const kibanaObjectWrapper = new KibanaObjectsWrapperModel<T>(kibanaObjects);
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

export const kibanaConnector = new KibanaConnector();
