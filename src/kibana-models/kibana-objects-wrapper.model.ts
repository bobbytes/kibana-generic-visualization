import { KibanaObjectModel } from './kibana-object.model';

export class KibanaObjectsWrapperModel {
  public kibanaVersion = '6.3.2';
  public hits: KibanaObjectModel[] = [];

  constructor(kibanaObjects: KibanaObjectModel[]) {
    this.hits = kibanaObjects;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}
