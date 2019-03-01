import { KibanaDashboardGrid } from '../../src/kibana-dashboard-grid';

describe('KibanaDashboardGrid', () => {
  let kibanaDashboardGrid: KibanaDashboardGrid;

  beforeAll(() => {
    kibanaDashboardGrid = new KibanaDashboardGrid(24, 15);
  });

  test('must return calculated grid data', () => {
    expect(kibanaDashboardGrid).toBeInstanceOf(KibanaDashboardGrid);

    const expectedGridData1 = { x: 0, y: 0, w: 24, h: 15, i: '1' };
    const expectedGridData2 = { x: 24, y: 0, w: 24, h: 15, i: '2' };
    const expectedGridData3 = { x: 0, y: 15, w: 24, h: 15, i: '3' };
    const expectedGridData4 = { x: 24, y: 15, w: 24, h: 15, i: '4' };

    const gridData1 = kibanaDashboardGrid.getGridData('1');
    const gridData2 = kibanaDashboardGrid.getGridData('2');
    const gridData3 = kibanaDashboardGrid.getGridData('3');
    const gridData4 = kibanaDashboardGrid.getGridData('4');

    expect(gridData1).toEqual(expectedGridData1);
    expect(gridData2).toEqual(expectedGridData2);
    expect(gridData3).toEqual(expectedGridData3);
    expect(gridData4).toEqual(expectedGridData4);
  });
});
