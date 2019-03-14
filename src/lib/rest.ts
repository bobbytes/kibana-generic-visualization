import request from 'request';

import { Config } from './config';
import { Inject, injector } from './dependency-injection';

enum RequestMethodEnum {
  Post = 'POST',
  Delete = 'DELETE',
}

export interface IRestConfig {
  host: string;
  token: string;
}

type TOptions = request.UrlOptions & request.CoreOptions;

@Inject()
export class Rest {
  private options: TOptions;

  constructor(
    public config: Config
  ) { }

  public init(): void {
    const headers = {
      'accept': 'application/json',
      'content-type': 'application/json',
      'X-API-TOKEN': this.config.api.token,
    };

    this.options = {
      url: `${this.config.api.host}/kibana`,
      headers,
    };
  }

  public post<T>(url: string, body: string): Promise<T> {
    const options = {
      ...this.options,
      method: RequestMethodEnum.Post,
      body,
    };

    return this.sendRequest<T>(url, options);
  }

  public delete<T>(url: string): Promise<T> {
    const options = {
      ...this.options,
      method: RequestMethodEnum.Delete,
    };

    return this.sendRequest<T>(url, options);
  }

  private sendRequest<T>(url: string, options: TOptions): Promise<T> {
    const requestOptions = {
      ...options,
      url: `${this.options.url}${url}`,
    };

    return new Promise<T>((resolve, reject) => {
      request(requestOptions, (error: any, response: request.Response, body: T) => {
        if (!error && response.statusCode === 200) {
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

injector.resolve(Rest);
