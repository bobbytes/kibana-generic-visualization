import { isArray } from 'util';

import { ObjectTypeEnum } from '../common/enums/object-id-prefix.enum';
import { KibanaObjectModel } from '../common/models/kibana-object.model';
import { KibanaObjectsWrapperModel } from '../common/models/kibana-objects-wrapper.model';
import { Inject, injector } from './dependency-injection';
import { Rest } from './rest';

export interface IKibanaResponse {
  created: string[];
  updated: string[];
  failed: string[];
}

@Inject()
export class KibanaConnector {
  constructor(
    private rest: Rest
  ) {
    // tslint:disable-next-line: no-empty
  }

  public async getAllKibanaObjectsByType<T>(objectType: ObjectTypeEnum): Promise<KibanaObjectModel<T>[]> {
    const body = `{"type": "${objectType}"}`;
    const response = await this.rest.post<KibanaObjectsWrapperModel<T>>('/export', body);
    return response.hits;
  }

  public setKibanaObject<T>(objectType: ObjectTypeEnum, source: T | T[]): Promise<IKibanaResponse> {
    const kibanaObjects = isArray(source)
      ? source.map(s => new KibanaObjectModel<T>(objectType, s))
      : [new KibanaObjectModel<T>(objectType, source)];

    const kibanaObjectWrapper = new KibanaObjectsWrapperModel<T>(kibanaObjects);

    return this.rest.post<IKibanaResponse>('/import', kibanaObjectWrapper.toString());
  }
}

injector.resolve(KibanaConnector);
