import { ObjectTypeEnum } from '../../common/enums/object-id-prefix.enum';
import { Config } from '../../lib/config';
import { injector } from '../../lib/dependency-injection';
import { DashboardGridData } from './dashboard-grid-data.model';

export class DashboardPanelModel {
  public panelIndex: string;
  public gridData: DashboardGridData;
  public version: string;
  public type = ObjectTypeEnum.Visualization;
  public id: string;
  public embeddableConfig = {};

  constructor(
    visualizationId: string,
    gridData: DashboardGridData
  ) {
    const config = injector.resolve<Config>(Config);

    this.panelIndex = gridData.i;
    this.id = visualizationId;
    this.gridData = gridData;
    this.version = config.kibanaVersion;
  }
}
