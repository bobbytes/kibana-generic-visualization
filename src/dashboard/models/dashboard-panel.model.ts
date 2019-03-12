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
    visualizationId: string,
    gridData: DashboardGridData
  ) {
    this.panelIndex = gridData.i;
    this.id = visualizationId;
    this.gridData = gridData;
  }
}
