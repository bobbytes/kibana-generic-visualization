import { FilterModel } from './filter.model';

export interface ISearchSourceModelConfig {
  filter?: FilterModel[];
  index?: string;
  highlightAll?: boolean;
  version?: boolean;
}

export class SearchSourceModel {
  public filter: FilterModel[];
  public query = {
    language: 'kuery',
    query: '',
  };
  public index?: string;
  public highlightAll?: boolean;
  public version?: boolean;

  constructor(config: ISearchSourceModelConfig) {
    this.filter = config.filter || [];
    this.index = config.index;
    this.highlightAll = config.highlightAll;
    this.version = config.version;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}
