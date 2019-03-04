import { DashboardGrid } from './dashboard-grid';
import { DashboardPanelModel } from './models/dashboard-panel.model';
import { DashboardModel } from './models/dashboard.model';

export const getDashboard = (): DashboardModel => {
  const kibanaDashboardGrid = new DashboardGrid(24, 15);
  const title = 'Generated Dashboard';

  const gridData1 = kibanaDashboardGrid.getGridData('1');
  const gridData2 = kibanaDashboardGrid.getGridData('2');
  const gridData3 = kibanaDashboardGrid.getGridData('3');
  const gridData4 = kibanaDashboardGrid.getGridData('4');

  const panel1 = new DashboardPanelModel(gridData1.i, '6211c5f0-36a0-11e9-ad1a-a1a3d4b3a09a', gridData1);
  const panel2 = new DashboardPanelModel(gridData2.i, '6211c5f1-36a0-11e9-ad1a-a1a3d4b3a09a', gridData2);
  const panel3 = new DashboardPanelModel(gridData3.i, '6211c5f2-36a0-11e9-ad1a-a1a3d4b3a09a', gridData3);
  const panel4 = new DashboardPanelModel(gridData4.i, '6211c5f3-36a0-11e9-ad1a-a1a3d4b3a09a', gridData4);

  const panels = [panel1, panel2, panel3, panel4];

  return new DashboardModel(title, panels);
};
