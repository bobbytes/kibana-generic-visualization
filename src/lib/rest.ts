import request from 'request';

import { env } from '../env';

enum RequestMethodEnum {
  Post = 'Post',
}

class Rest {
  private headers = {
    'accept': 'application/json',
    'content-type': 'application/json',
    'X-API-TOKEN': env.logzIo.token,
  };

  private options = {
    url: `${env.logzIo.host}/kibana`,
    headers: this.headers,
  };

  public post<T>(url: string, body: string): Promise<T> {
    const options = {
      ...this.options,
      url: `${this.options.url}${url}`,
      method: RequestMethodEnum.Post,
      body,
    };

    return this.sendRequest<T>(url, options);
  }

  private sendRequest<T>(url: string, options: request.UrlOptions): Promise<T> {
    const requestOptions = {
      ...options,
      url: `${this.options.url}${url}`,
    };

    return new Promise<T>((resolve, reject) => {
      request(requestOptions, (error: any, response: request.Response, body: T) => {
        if (!error && response.statusCode === 200) {
          console.log(body);
          resolve(this.parseResponseBody(body));
        } else {
          reject(error);
        }
      });
    });
  }

  private parseResponseBody(response: any): any {
    let parsedResponse;

    if (typeof response === 'string') {
      try {
        parsedResponse = JSON.parse(response);
      } catch (error) {
        parsedResponse = response;
      }
    }

    return parsedResponse || response;
  }
}

export const rest = new Rest();
