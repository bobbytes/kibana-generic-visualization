import { ObjectTypeEnum } from '../../common/enums/object-id-prefix.enum';
import { env } from '../../env';
import { DashboardGridData } from './dashboard-grid-data.model';

export class DashboardPanelModel {
  public panelIndex: string;
  public gridData: DashboardGridData;
  public version = env.kibana.version;
  public type = ObjectTypeEnum.Visualization;
  public id: string;
  public embeddableConfig = {};

  constructor(
    panelIndex: string,
    visualizationId: string,
    gridData: DashboardGridData
  ) {
    this.panelIndex = panelIndex;
    this.id = visualizationId;
    this.gridData = gridData;
  }
}
