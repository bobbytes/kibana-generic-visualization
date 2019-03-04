import { ObjectTypeEnum } from './common/enums/object-id-prefix.enum';
import { VisualizationTypeEnum } from './common/enums/visualization-type.enum';
import { redisVisualization } from './common/redis-visualization';
import { getDashboard } from './dashboard/dashboard';
import { DashboardModel } from './dashboard/models/dashboard.model';
import { kibanaConnector } from './lib/kibana-connector';
import { VisualizationModel } from './visualization/models/visualization.model';

class GenericVisualization {
  public createVisualizationsByType(visualizationType: VisualizationTypeEnum, serviceNames: string[]): void {
    let visualizations: VisualizationModel[];

    switch (visualizationType) {
      case VisualizationTypeEnum.Redis:
        visualizations = redisVisualization.getRedisVisualizations(serviceNames);
        break;
      default:
    }

    if (visualizations && visualizations.length) {
      kibanaConnector.setKibanaObject<VisualizationModel>(ObjectTypeEnum.Visualization, visualizations);
    }
  }

  public createDashboard(): void {
    const dashboard = getDashboard();
    kibanaConnector.setKibanaObject<DashboardModel>(ObjectTypeEnum.Dashboard, dashboard);
  }
}

export const genericVisualization = new GenericVisualization();
