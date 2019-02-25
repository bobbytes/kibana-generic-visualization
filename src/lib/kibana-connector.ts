import request from 'request';
import { isArray } from 'util';

import { KibanaObjectTypeEnum } from '../enums/kibana-object-id-prefix.enum';
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

  public getKibanaObject(objectType: KibanaObjectTypeEnum): void {
    const options = this.options;
    options.url = `${options.url}/export`;
    options.body = `{"type": "${objectType}"}`;

    request(options, this.callback.bind(this));
  }

  public setKibanaObject<T>(objectType: KibanaObjectTypeEnum, source: T | T[]): void {
    const kibanaObjects = isArray(source)
      ? source.map(s => new KibanaObjectModel<T>(objectType, s))
      : [new KibanaObjectModel<T>(objectType, source)];

    const kibanaObjectWrapper = new KibanaObjectsWrapperModel<T>(kibanaObjects);
    const options = this.options;
    options.body = kibanaObjectWrapper.toString();
    options.url = `${options.url}/import`;

    console.log('bubu', options.body);

    request(options, this.callback.bind(this));
  }

  private callback(error: any, response: any, body: any): void {
    if (!error && response.statusCode === 200) {
      console.log(body);
    }
  }
}

export const kibanaConnector = new KibanaConnector();
