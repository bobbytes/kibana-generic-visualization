import { ObjectTypeEnum } from './common/enums/object-id-prefix.enum';
import { VisualizationTypeEnum } from './common/enums/visualization-type.enum';
import { dashboard } from './dashboard/dashboard';
import { kibanaConnector } from './lib/kibana-connector';
import { createRedisVisualizations } from './visualization/create-redis-visualization';

const redisServiceNames = [
  'taibika-api-public-revisionguard-3',
  'taibika-api-public-settings-store',
  'taibika-api-revisionguard-3',
  'taibika-app-admin-revisionguard-3',
];

async function createVisualizations(): Promise<void> {
  const visualizationIds = await createRedisVisualizations(redisServiceNames);
  dashboard.create('Redis Dashboard', visualizationIds);
}

async function bubu(): Promise<void> {
  const visualizationsFromLogz = await kibanaConnector.getAllKibanaObjectsByType(ObjectTypeEnum.Visualization);
  console.log('bubu', JSON.stringify(visualizationsFromLogz));
}

createVisualizations();
// bubu();
