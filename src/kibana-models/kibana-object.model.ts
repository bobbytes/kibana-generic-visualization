import uuid from 'uuid/v1';

import { KibanaObjectIdPrefixEnum } from '../enums/kibana-object-id-prefix.enum';

export class KibanaObjectModel<T> {
  public _type = 'doc';
  public _id: string;
  public _source: T;

  constructor(idPrefix: KibanaObjectIdPrefixEnum, source: T) {
    this._source = source;
    this._id = `${idPrefix}:${uuid()}`;
  }
}
