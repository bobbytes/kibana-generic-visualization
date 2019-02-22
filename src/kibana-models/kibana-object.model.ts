import uuidv1 from 'uuid/v1';

import { KibanaVisualizationModel } from './kibana-visualization/kibana-visualization.model';

export class KibanaObjectModel {
  public _type = 'doc';
  public _id: string;
  public _source: KibanaVisualizationModel;

  constructor(source: KibanaVisualizationModel) {
    this._source = source;
    this._id = `visualization:${uuidv1()}`;
  }
}
