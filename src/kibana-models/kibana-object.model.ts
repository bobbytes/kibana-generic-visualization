import uuid from 'uuid/v1';

import { KibanaObjectTypeEnum } from '../enums/kibana-object-id-prefix.enum';

export class KibanaObjectModel<T> {
  public _type = 'doc';
  public _id: string;
  public _source: T;

  constructor(objectType: KibanaObjectTypeEnum, source: T) {
    this._source = source;
    this._id = `${objectType}:${uuid()}`;
  }
}
