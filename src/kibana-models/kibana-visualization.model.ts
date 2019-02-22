import { SearchSourceJsonModel } from './search-source-json.model';
import { VisualizationStateModel } from './visualization-state.model';

export class KibanaVisualizationModel {
  public type = 'visualization';
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
    searchSourceJSON: SearchSourceJsonModel) {
    this.visualization.title = title;
    this.visualization.visState = JSON.stringify(visualizationState);
    this.visualization.savedSearchId = savedSearchId;
    this.visualization.kibanaSavedObjectMeta.searchSourceJSON = searchSourceJSON.toString();
  }
}
