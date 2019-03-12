import { ObjectTypeEnum } from '../../common/enums/object-id-prefix.enum';
import { FilterModel } from '../../common/models/filter.model';
import { SearchSourceModel } from '../../common/models/search-source.model';
import { VisualizationStateModel } from './visualization-state.model';

export class VisualizationModel {
  public type = ObjectTypeEnum.Visualization;
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
    filter: FilterModel[]) {
    this.visualization.title = title;
    this.visualization.visState = JSON.stringify(visualizationState);
    this.visualization.savedSearchId = savedSearchId;

    const searchSourceJSON = new SearchSourceModel({ filter });
    searchSourceJSON.index = '[logzioCustomerIndex]YYMMDD';

    this.visualization.kibanaSavedObjectMeta.searchSourceJSON = searchSourceJSON.toString();
  }
}
