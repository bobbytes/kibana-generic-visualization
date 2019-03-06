import { isArray } from 'util';

import { ObjectTypeEnum } from '../common/enums/object-id-prefix.enum';
import { KibanaObjectModel } from '../common/models/kibana-object.model';
import { KibanaObjectsWrapperModel } from '../common/models/kibana-objects-wrapper.model';
import { rest } from './rest';

export interface IKibanaResponse {
  created: string[];
  updated: string[];
  failed: string[];
}

export type TKibanaResponse = Promise<IKibanaResponse>;

class KibanaConnector {
  public async getAllKibanaObjectsByType<T>(objectType: ObjectTypeEnum): Promise<KibanaObjectModel<T>[]> {
    const body = `{"type": "${objectType}"}`;
    const response = await rest.post<KibanaObjectsWrapperModel<T>>('/export', body);
    return response.hits;
  }

  public setKibanaObject<T>(objectType: ObjectTypeEnum, source: T | T[]): TKibanaResponse {
    const kibanaObjects = isArray(source)
      ? source.map(s => new KibanaObjectModel<T>(objectType, s))
      : [new KibanaObjectModel<T>(objectType, source)];

    const kibanaObjectWrapper = new KibanaObjectsWrapperModel<T>(kibanaObjects);

    return rest.post<IKibanaResponse>('/import', kibanaObjectWrapper.toString());
  }
}

export const kibanaConnector = new KibanaConnector();
