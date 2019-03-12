import { IKibanaResponse } from '../lib/kibana-connector';
import { VisualizationStateTypeEnum } from './enums/visualization-state-type.enum';
import { Visualization } from './visualization';

interface ICreateMongoDbVisualizationsResponse {
  metricVisualizations: IKibanaResponse;
}

export const createMongoDbVisualizations = async (serviceNames: string[], savedSearchId: string): Promise<ICreateMongoDbVisualizationsResponse> => {
  const visualization = new Visualization(serviceNames);

  const metricFields = [
    { fieldName: 'metrics.calculatedFields.usedMemoryPercentage', customLabel: 'Used Memory in %' },
    { fieldName: 'metrics.calculatedFields.usedStoragePercentage', customLabel: 'Used Storage in %' },
    { fieldName: 'metrics.connections.current', customLabel: 'Current Connections' },
    { fieldName: 'metrics.globalLock.currentQueue.total', customLabel: 'Current Queue' },
  ];

  const metricVisualizations = await visualization.getVisualizations(
    VisualizationStateTypeEnum.Metric,
    serviceName => `MongoDB ${serviceName} Metric`,
    metricFields,
    savedSearchId
  );

  const metricVisualizationsResponse = await visualization.createVisualizations(metricVisualizations);

  return { metricVisualizations: metricVisualizationsResponse };
};
