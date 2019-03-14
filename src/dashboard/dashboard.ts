import { ObjectTypeEnum } from '../common/enums/object-id-prefix.enum';
import { KibanaObjectModel } from '../common/models/kibana-object.model';
import { Inject, injector } from '../lib/dependency-injection';
import { IKibanaResponse, KibanaConnector } from '../lib/kibana-connector';
import { DashboardGrid, IDashboardGridConfig } from './dashboard-grid';
import { DashboardPanelModel } from './models/dashboard-panel.model';
import { DashboardModel } from './models/dashboard.model';

@Inject()
export class Dashboard {
  constructor(
    public kibanaConnector: KibanaConnector
  ) { }

  public getAll(): Promise<KibanaObjectModel<DashboardModel>[]> {
    return this.kibanaConnector.getAllKibanaObjectsByType<DashboardModel>(ObjectTypeEnum.Dashboard);
  }

  public create = (title: string, visualizationIds: string[], dashboardGridConfig: IDashboardGridConfig): Promise<IKibanaResponse> => {
    const panels = this.getPanels(visualizationIds, dashboardGridConfig);

    const newDashboard = new DashboardModel(title, panels);
    return this.kibanaConnector.setKibanaObject<DashboardModel>(ObjectTypeEnum.Dashboard, newDashboard);
  }

  private getPanels(visualizationIds: string[], dashboardGridConfig: IDashboardGridConfig): DashboardPanelModel[] {
    const kibanaDashboardGrid = new DashboardGrid(dashboardGridConfig);

    return visualizationIds.map((visualizationId, index) => {
      const gridData = kibanaDashboardGrid.getGridData(`${index + 1}`);
      return new DashboardPanelModel(visualizationId, gridData);
    });
  }
}

injector.resolve(Dashboard);
