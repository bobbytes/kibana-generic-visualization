export class KibanaVisualizationSeriesParamModel {
  public data = {
    id: '',
    label: '',
  };
  public drawLinesBetweenPoints = true;
  public interpolate = 'linear';
  public lineWidth = 2;
  public mode = 'normal';
  public show = true;
  public showCircles = true;
  public type = 'line';
  public valueAxis = 'ValueAxis-1';

  constructor(id: string, label: string) {
    this.data.id = id;
    this.data.label = label;
  }
}
