import { ObjectTypeEnum } from '../../common/enums/object-id-prefix.enum';
import { SearchSourceModel } from '../../common/models/search-source.model';
import { DashboardOptionsModel } from './dashboard-options.model';
import { DashboardPanelModel } from './dashboard-panel.model';

export class DashboardModel {
  public type = ObjectTypeEnum.Dashboard;
  public dashboard = {
    title: '',
    hits: 0.0,
    panelsJSON: '',
    optionsJSON: '',
    kibanaSavedObjectMeta: {
      searchSourceJSON: '',
    },
  };

  constructor(
    title: string,
    panels: DashboardPanelModel[]
  ) {
    this.dashboard.title = title;
    this.dashboard.panelsJSON = JSON.stringify(panels);
    this.dashboard.optionsJSON = new DashboardOptionsModel().toString();
    const searchSourceJson = new SearchSourceModel({ highlightAll: true, version: true });
    this.dashboard.kibanaSavedObjectMeta.searchSourceJSON = searchSourceJson.toString();
  }
}
