import uuid from 'uuid/v1';

import { ObjectTypeEnum } from '../enums/object-id-prefix.enum';

export class KibanaObjectModel<T> {
  public _type = 'doc';
  public _id: string;
  public _source: T;

  constructor(objectType: ObjectTypeEnum, source: T) {
    this._source = source;
    this._id = `${objectType}:${uuid()}`;
  }
}
