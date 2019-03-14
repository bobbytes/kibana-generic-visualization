import { injector } from './dependency-injection';
import { IRestConfig } from './rest';

export interface IConfig {
  kibanaVersion: string;
  api: IRestConfig;
}

export class Config {
  public kibanaVersion: string;
  public api: IRestConfig;

  public set(config: IConfig): void {
    this.kibanaVersion = config.kibanaVersion;
    this.api = config.api;
  }
}

injector.resolve(Config);
