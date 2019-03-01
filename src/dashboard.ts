import { KibanaDashboardGrid } from './kibana-dashboard-grid';
import {
    KibanaDashboardPanelModel
} from './kibana-models/kibana-dashboard/kibana-dashboard-panel.model';
import { KibanaDashboardModel } from './kibana-models/kibana-dashboard/kibana-dashboard.model';

export const getDashboard = (): KibanaDashboardModel => {
  const kibanaDashboardGrid = new KibanaDashboardGrid(24, 15);
  const title = 'Generated Dashboard';

  const gridData1 = kibanaDashboardGrid.getGridData('1');
  const gridData2 = kibanaDashboardGrid.getGridData('2');
  const gridData3 = kibanaDashboardGrid.getGridData('3');
  const gridData4 = kibanaDashboardGrid.getGridData('4');

  const panel1 = new KibanaDashboardPanelModel(gridData1.i, '6211c5f0-36a0-11e9-ad1a-a1a3d4b3a09a', gridData1);
  const panel2 = new KibanaDashboardPanelModel(gridData2.i, '6211c5f1-36a0-11e9-ad1a-a1a3d4b3a09a', gridData2);
  const panel3 = new KibanaDashboardPanelModel(gridData3.i, '6211c5f2-36a0-11e9-ad1a-a1a3d4b3a09a', gridData3);
  const panel4 = new KibanaDashboardPanelModel(gridData4.i, '6211c5f3-36a0-11e9-ad1a-a1a3d4b3a09a', gridData4);

  const panels = [panel1, panel2, panel3, panel4];

  return new KibanaDashboardModel(title, panels);
};
