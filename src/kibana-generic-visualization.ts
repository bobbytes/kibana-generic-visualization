import * as request from 'request';

import { env } from './env';

export class GenericKibanaVisualization {
  private headers = {
    'accept': 'application/json',
    'content-type': 'application/json',
    'X-API-TOKEN': env.logzIo.token,
  };

  private dataString = '{"type": "visualization"}';

  private options = {
    url: `${env.logzIo.host}/kibana/export`,
    method: 'POST',
    headers: this.headers,
    body: this.dataString,
  };

  public request(): void {
    request(this.options, this.callback.bind(this));
  }

  private callback(error: any, response: any, body: any): void {
    if (!error && response.statusCode === 200) {
      console.log(body);
    }
  }
}
