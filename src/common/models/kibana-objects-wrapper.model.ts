import { env } from '../../env';
import { KibanaObjectModel } from './kibana-object.model';

export class KibanaObjectsWrapperModel<T> {
  public kibanaVersion = env.kibana.version;
  public hits: KibanaObjectModel<T>[] = [];

  constructor(kibanaObjects: KibanaObjectModel<T>[]) {
    this.hits = kibanaObjects;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}
