import { VisualizationTypeEnum } from './common/enums/visualization-type.enum';
import { genericVisualization } from './generic-visualization';

const redisServiceNames = [
  'taibika-api-public-revisionguard-3',
  'taibika-api-public-settings-store',
  'taibika-api-revisionguard-3',
  'taibika-app-admin-revisionguard-3',
];

async function createVisualization(): Promise<void> {
  const createdIds = await genericVisualization.createVisualizationsByType(VisualizationTypeEnum.Redis, redisServiceNames);
  genericVisualization.createDashboard(createdIds);
}

createVisualization();

// kibanaConnector.getKibanaObject(ObjectTypeEnum.Dashboard);
