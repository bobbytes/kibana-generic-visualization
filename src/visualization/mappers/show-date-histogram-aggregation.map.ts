import { VisualizationStateTypeEnum } from '../enums/visualization-state-type.enum';

const showDateHistogramAggregationMap = new Map<VisualizationStateTypeEnum, boolean>();

showDateHistogramAggregationMap.set(VisualizationStateTypeEnum.Line, true);
showDateHistogramAggregationMap.set(VisualizationStateTypeEnum.Metric, false);

export { showDateHistogramAggregationMap };
