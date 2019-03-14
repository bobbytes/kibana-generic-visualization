import { Config } from '../../lib/config';
import { injector } from '../../lib/dependency-injection';
import { KibanaObjectModel } from './kibana-object.model';

export class KibanaObjectsWrapperModel<T> {
  public kibanaVersion: string;
  public hits: KibanaObjectModel<T>[] = [];

  constructor(kibanaObjects: KibanaObjectModel<T>[]) {
    const config = injector.resolve<Config>(Config);
    this.hits = kibanaObjects;
    this.kibanaVersion = config.kibanaVersion;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}
