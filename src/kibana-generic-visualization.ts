import { KibanaObjectIdPrefixEnum } from './enums/kibana-object-id-prefix.enum';
import {
    KibanaVisualizationModel
} from './kibana-models/kibana-visualization/kibana-visualization.model';
import { kibanaConnector } from './lib/kibana-connector';
import { redisVisualization } from './redis-visualization';

export class GenericKibanaVisualization {
  public createVisualizations(): void {
    const redisVisualizations = redisVisualization.getRedisVisualizations();
    kibanaConnector.setKibanaObject<KibanaVisualizationModel>(KibanaObjectIdPrefixEnum.Visualization, redisVisualizations);
  }
}
