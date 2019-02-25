import { KibanaObjectTypeEnum } from '../../enums/kibana-object-id-prefix.enum';
import { env } from '../../env';
import { KibanaDashboardGridData } from './kibana-dashboard-grid-data.model';

export class KibanaDashboardPanelModel {
  public panelIndex: string;
  public gridData: KibanaDashboardGridData;
  public version = env.kibana.version;
  public type = KibanaObjectTypeEnum.Visualization;
  public id: string;
  public embeddableConfig = {};

  constructor(
    panelIndex: string,
    visualizationId: string,
    gridData: KibanaDashboardGridData
  ) {
    this.panelIndex = panelIndex;
    this.id = visualizationId;
    this.gridData = gridData;
  }
}
