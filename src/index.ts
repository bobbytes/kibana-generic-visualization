import { KibanaObjectTypeEnum } from './enums/kibana-object-id-prefix.enum';
import { GenericKibanaVisualization } from './kibana-generic-visualization';
import { kibanaConnector } from './lib/kibana-connector';

export * from './kibana-generic-visualization';

const bubu = new GenericKibanaVisualization();
bubu.createDashboard();

// kibanaConnector.getKibanaObject(KibanaObjectTypeEnum.Dashboard);
