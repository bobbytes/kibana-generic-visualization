import { VisualizationColorSchemaEnum } from '../enums/visualization-color-schema.enum';
import { VisualizationColorsRangeEnum } from '../enums/visualization-colors-range.enum';

export class VisualizationMetricModel {
  public percentageMode = false;
  public useRanges = false;
  public colorSchema = VisualizationColorSchemaEnum.GreenToRed;
  public metricColorMode = VisualizationColorsRangeEnum.None;
  public colorsRange = [
    {
      from: 0,
      to: 10000,
    },
  ];
  public labels = {
    show: true,
  };
  public invertColors = false;
  public style = {
    bgFill: '#000',
    bgColor: false,
    labelColor: false,
    subText: '',
    fontSize: 60,
  };
}
