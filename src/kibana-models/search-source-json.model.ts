import { KibanaVisualizationFilterModel } from './kibana-visualization-filter.model';

export class SearchSourceJsonModel {
  public filter: KibanaVisualizationFilterModel[] = [];
  public query = {
    language: 'kuery',
    query: '',
  };
  public index = '[logzioCustomerIndex]YYMMDD';

  constructor(filter: KibanaVisualizationFilterModel[]) {
    this.filter = filter;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}
