import { DashboardGrid } from './dashboard-grid';
import { DashboardPanelModel } from './models/dashboard-panel.model';
import { DashboardModel } from './models/dashboard.model';

export const getDashboard = (visualizationIds: string[]): DashboardModel => {
  const kibanaDashboardGrid = new DashboardGrid(24, 15);
  const title = 'Generated Dashboard';

  const panels = visualizationIds.map((visualizationId, index) => {
    const gridData = kibanaDashboardGrid.getGridData(`${index + 1}`);
    return new DashboardPanelModel(visualizationId, gridData);
  });

  return new DashboardModel(title, panels);
};
