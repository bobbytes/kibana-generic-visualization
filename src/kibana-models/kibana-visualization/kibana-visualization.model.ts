import { KibanaObjectTypeEnum } from '../../enums/kibana-object-id-prefix.enum';
import { KibanaFilterModel } from '../kibana-filter.model';
import { KibanaSearchSourceModel } from '../kibana-search-source.model';
import { VisualizationStateModel } from './visualization-state.model';

export class KibanaVisualizationModel {
  public type = KibanaObjectTypeEnum.Visualization;
  public visualization = {
    title: '',
    visState: '',
    savedSearchId: '',
    kibanaSavedObjectMeta: {
      searchSourceJSON: '',
    },
  };

  constructor(
    title: string,
    visualizationState: VisualizationStateModel,
    savedSearchId: string,
    filter: KibanaFilterModel[]) {
    this.visualization.title = title;
    this.visualization.visState = JSON.stringify(visualizationState);
    this.visualization.savedSearchId = savedSearchId;

    const searchSourceJSON = new KibanaSearchSourceModel({ filter });
    searchSourceJSON.index = '[logzioCustomerIndex]YYMMDD';

    this.visualization.kibanaSavedObjectMeta.searchSourceJSON = searchSourceJSON.toString();
  }
}
