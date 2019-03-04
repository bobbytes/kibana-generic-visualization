import { ObjectTypeEnum } from './common/enums/object-id-prefix.enum';
import { VisualizationTypeEnum } from './common/enums/visualization-type.enum';
import { redisVisualization } from './common/redis-visualization';
import { getDashboard } from './dashboard/dashboard';
import { DashboardModel } from './dashboard/models/dashboard.model';
import { kibanaConnector } from './lib/kibana-connector';
import { VisualizationModel } from './visualization/models/visualization.model';

class GenericVisualization {
  public async createVisualizationsByType(visualizationType: VisualizationTypeEnum, serviceNames: string[]): Promise<string[]> {
    let visualizations: VisualizationModel[];

    switch (visualizationType) {
      case VisualizationTypeEnum.Redis:
        visualizations = redisVisualization.getRedisVisualizations(serviceNames);
        break;
      default:
    }

    if (visualizations && visualizations.length) {
      const response = await kibanaConnector.setKibanaObject<VisualizationModel>(ObjectTypeEnum.Visualization, visualizations);
      return response.created;
    }

    return [];
  }

  public createDashboard(visualizationIds: string[]): void {
    const dashboard = getDashboard(visualizationIds);
    kibanaConnector.setKibanaObject<DashboardModel>(ObjectTypeEnum.Dashboard, dashboard);
  }
}

export const genericVisualization = new GenericVisualization();
