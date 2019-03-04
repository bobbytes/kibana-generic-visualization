import { isArray } from 'util';

import { ObjectTypeEnum } from '../common/enums/object-id-prefix.enum';
import { KibanaObjectModel } from '../common/models/kibana-object.model';
import { KibanaObjectsWrapperModel } from '../common/models/kibana-objects-wrapper.model';
import { rest } from './rest';

interface IKibanaResponse {
  created: string[];
  updated: string[];
  failed: string[];
}

class KibanaConnector {
  public getKibanaObject(objectType: ObjectTypeEnum): Promise<any> {
    const body = `{"type": "${objectType}"}`;
    return rest.post('/export', body);
  }

  public setKibanaObject<T>(objectType: ObjectTypeEnum, source: T | T[]): Promise<IKibanaResponse> {
    const kibanaObjects = isArray(source)
      ? source.map(s => new KibanaObjectModel<T>(objectType, s))
      : [new KibanaObjectModel<T>(objectType, source)];

    const kibanaObjectWrapper = new KibanaObjectsWrapperModel<T>(kibanaObjects);

    return rest.post('/import', kibanaObjectWrapper.toString());
  }
}

export const kibanaConnector = new KibanaConnector();
