import { dashboard } from '../dashboard/dashboard';
import { VisualizationStateTypeEnum } from './enums/visualization-state-type.enum';
import { Visualization } from './visualization';

export const createRedisVisualizations = async (serviceNames: string[]): Promise<string[]> => {
  const visualization = new Visualization(serviceNames);

  const memoryFields = [
    { fieldName: 'metrics.mem_fragmentation_ratio', customLabel: 'Memory Fragmentation Ratio' },
    { fieldName: 'metrics.evicted_keys', customLabel: 'Removed Keys' },
  ];

  const memoryVisualizations = visualization.getVisualizations(
    VisualizationStateTypeEnum.Line,
    serviceName => `Redis ${serviceName} Memory`,
    memoryFields
  );

  const activityFields = [
    { fieldName: 'metrics.connected_clients', customLabel: 'Connected Clients' },
    { fieldName: 'metrics.connected_slaves', customLabel: 'Connected Slaves' },
    { fieldName: 'metrics.rejected_connections', customLabel: 'Rejected Connections' },
  ];

  const activityVisualizations = visualization.getVisualizations(
    VisualizationStateTypeEnum.Line,
    serviceName => `Redis ${serviceName} Activity`,
    activityFields
  );

  const metricFields = [...memoryFields, ...activityFields];

  const metricVisualizations = visualization.getVisualizations(
    VisualizationStateTypeEnum.Metric,
    serviceName => `Redis ${serviceName} Metric`,
    metricFields
  );

  visualization.createVisualizations([
    ...memoryVisualizations,
    ...activityVisualizations,
  ]);

  const response = await visualization.createVisualizations(metricVisualizations);

  dashboard.create('Generated Redis Metrics', response.created);

  return response.created;
};
