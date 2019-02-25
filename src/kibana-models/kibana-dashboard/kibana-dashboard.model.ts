import { KibanaObjectTypeEnum } from '../../enums/kibana-object-id-prefix.enum';
import { KibanaSearchSourceModel } from '../kibana-search-source.model';
import { KibanaDashboardOptionsModel } from './kibana-dashboard-options.model';
import { KibanaDashboardPanelModel } from './kibana-dashboard-panel.model';

export class KibanaDashboardModel {
  public type = KibanaObjectTypeEnum.Dashboard;
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
    panels: KibanaDashboardPanelModel[]
  ) {
    this.dashboard.title = title;
    this.dashboard.panelsJSON = JSON.stringify(panels);
    this.dashboard.optionsJSON = new KibanaDashboardOptionsModel().toString();
    const searchSourceJson = new KibanaSearchSourceModel({ highlightAll: true, version: true });
    this.dashboard.kibanaSavedObjectMeta.searchSourceJSON = searchSourceJson.toString();
  }
}
