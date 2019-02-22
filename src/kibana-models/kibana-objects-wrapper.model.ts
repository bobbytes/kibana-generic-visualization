import { KibanaObjectModel } from './kibana-object.model';

export class KibanaObjectsWrapperModel<T> {
  public kibanaVersion = '6.3.2';
  public hits: KibanaObjectModel<T>[] = [];

  constructor(kibanaObjects: KibanaObjectModel<T>[]) {
    this.hits = kibanaObjects;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}
