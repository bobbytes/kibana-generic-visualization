import { VisualizationTypeEnum } from './common/enums/visualization-type.enum';
import { genericVisualization } from './generic-visualization';

const redisServiceNames = [
  'taibika-api-public-revisionguard-3',
  'taibika-api-public-settings-store',
  'taibika-api-revisionguard-3',
  'taibika-app-admin-revisionguard-3',
];

genericVisualization.createVisualizationsByType(VisualizationTypeEnum.Redis, redisServiceNames);
genericVisualization.createDashboard();

// kibanaConnector.getKibanaObject(ObjectTypeEnum.Dashboard);
