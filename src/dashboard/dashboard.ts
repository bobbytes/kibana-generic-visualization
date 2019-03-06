import { ObjectTypeEnum } from '../common/enums/object-id-prefix.enum';
import { KibanaObjectModel } from '../common/models/kibana-object.model';
import { kibanaConnector } from '../lib/kibana-connector';
import { DashboardGrid } from './dashboard-grid';
import { DashboardPanelModel } from './models/dashboard-panel.model';
import { DashboardModel } from './models/dashboard.model';

class Dashboard {
  public getAll(): Promise<KibanaObjectModel<DashboardModel>[]> {
    return kibanaConnector.getAllKibanaObjectsByType<DashboardModel>(ObjectTypeEnum.Dashboard);
  }

  public create = (title: string, visualizationIds: string[]): void => {
    const panels = this.getPanels(visualizationIds);

    const newDashboard = new DashboardModel(title, panels);
    kibanaConnector.setKibanaObject<DashboardModel>(ObjectTypeEnum.Dashboard, newDashboard);
  }

  private getPanels(visualizationIds: string[]): DashboardPanelModel[] {
    const kibanaDashboardGrid = new DashboardGrid(12, 12);

    return visualizationIds.map((visualizationId, index) => {
      const gridData = kibanaDashboardGrid.getGridData(`${index + 1}`);
      return new DashboardPanelModel(visualizationId, gridData);
    });
  }
}

export const dashboard = new Dashboard();
