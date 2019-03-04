import { ObjectTypeEnum } from './common/enums/object-id-prefix.enum';
import { redisVisualization } from './common/redis-visualization';
import { getDashboard } from './dashboard/dashboard';
import { DashboardModel } from './dashboard/models/dashboard.model';
import { kibanaConnector } from './lib/kibana-connector';
import { VisualizationModel } from './visualization/models/visualization.model';

class GenericVisualization {
  public createVisualizations(): void {
    const redisVisualizations = redisVisualization.getRedisVisualizations();
    kibanaConnector.setKibanaObject<VisualizationModel>(ObjectTypeEnum.Visualization, redisVisualizations);
  }

  public createDashboard(): void {
    const dashboard = getDashboard();
    kibanaConnector.setKibanaObject<DashboardModel>(ObjectTypeEnum.Dashboard, dashboard);
  }
}

export const genericVisualization = new GenericVisualization();
