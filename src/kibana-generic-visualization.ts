import { getDashboard } from './dashboard';
import { KibanaObjectTypeEnum } from './enums/kibana-object-id-prefix.enum';
import { KibanaDashboardModel } from './kibana-models/kibana-dashboard/kibana-dashboard.model';
import {
    KibanaVisualizationModel
} from './kibana-models/kibana-visualization/kibana-visualization.model';
import { kibanaConnector } from './lib/kibana-connector';
import { redisVisualization } from './redis-visualization';

export class GenericKibanaVisualization {
  public createVisualizations(): void {
    const redisVisualizations = redisVisualization.getRedisVisualizations();
    kibanaConnector.setKibanaObject<KibanaVisualizationModel>(KibanaObjectTypeEnum.Visualization, redisVisualizations);
  }

  public createDashboard(): void {
    const dashboard = getDashboard();
    kibanaConnector.setKibanaObject<KibanaDashboardModel>(KibanaObjectTypeEnum.Dashboard, dashboard);
  }
}
