import { dashboard } from '../dashboard/dashboard';
import { IKibanaResponse } from '../lib/kibana-connector';
import { VisualizationStateTypeEnum } from './enums/visualization-state-type.enum';
import { Visualization } from './visualization';

interface ICreateRedisVisualizationsResponse {
  memoryVisualizations: IKibanaResponse;
  activityVisualizations: IKibanaResponse;
  metricVisualizations: IKibanaResponse;
}

export const createRedisVisualizations = async (serviceNames: string[], savedSearchId: string): Promise<ICreateRedisVisualizationsResponse> => {
  const visualization = new Visualization(serviceNames);

  const memoryFields = [
    { fieldName: 'metrics.mem_fragmentation_ratio', customLabel: 'Memory Fragmentation Ratio' },
    { fieldName: 'metrics.evicted_keys', customLabel: 'Removed Keys' },
  ];

  const memoryVisualizations = visualization.getVisualizations(
    VisualizationStateTypeEnum.Line,
    serviceName => `Redis ${serviceName} Memory`,
    memoryFields,
    savedSearchId
  );

  const activityFields = [
    { fieldName: 'metrics.connected_clients', customLabel: 'Connected Clients' },
    { fieldName: 'metrics.connected_slaves', customLabel: 'Connected Slaves' },
    { fieldName: 'metrics.rejected_connections', customLabel: 'Rejected Connections' },
  ];

  const activityVisualizations = visualization.getVisualizations(
    VisualizationStateTypeEnum.Line,
    serviceName => `Redis ${serviceName} Activity`,
    activityFields,
    savedSearchId
  );

  const metricFields = [...memoryFields, ...activityFields];

  const metricVisualizations = visualization.getVisualizations(
    VisualizationStateTypeEnum.Metric,
    serviceName => `Redis ${serviceName} Metric`,
    metricFields,
    savedSearchId
  );

  const promises = [
    visualization.createVisualizations(memoryVisualizations),
    visualization.createVisualizations(activityVisualizations),
    visualization.createVisualizations(metricVisualizations),
  ];

  const response = await Promise.all(promises);

  return {
    memoryVisualizations: response[0],
    activityVisualizations: response[1],
    metricVisualizations: response[2],
  };
};
