import { KibanaFilterModel } from './kibana-filter.model';

export interface IKibanaSearchSourceModelConfig {
  filter?: KibanaFilterModel[];
  index?: string;
  highlightAll?: boolean;
  version?: boolean;
}

export class KibanaSearchSourceModel {
  public filter: KibanaFilterModel[];
  public query = {
    language: 'kuery',
    query: '',
  };
  public index?: string;
  public highlightAll?: boolean;
  public version?: boolean;

  constructor(config: IKibanaSearchSourceModelConfig) {
    this.filter = config.filter || [];
    this.index = config.index;
    this.highlightAll = config.highlightAll;
    this.version = config.version;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}
