import { ObjectTypeEnum } from './common/enums/object-id-prefix.enum';
import { KibanaObjectModel } from './common/models/kibana-object.model';
import { Dashboard } from './dashboard';
import { IDashboardGridConfig } from './dashboard/dashboard-grid';
import { Config, IConfig } from './lib/config';
import { injector } from './lib/dependency-injection';
import { IKibanaResponse, KibanaConnector } from './lib/kibana-connector';
import { Rest } from './lib/rest';
import { TVisualizationFields, TVisualizationTitle, Visualization } from './visualization';
import { VisualizationStateTypeEnum } from './visualization/enums/visualization-state-type.enum';

export { VisualizationStateTypeEnum, TVisualizationTitle, TVisualizationFields, IKibanaResponse, IDashboardGridConfig, ObjectTypeEnum, KibanaObjectModel };

export class KibanaGenericVisualization {
  constructor(config: IConfig) {
    const globalConfig = injector.resolve<Config>(Config);
    globalConfig.set(config);

    const rest = injector.resolve<Rest>(Rest);
    rest.init();
  }

  public createVisualizations(
    stateType: VisualizationStateTypeEnum,
    serviceNames: string[],
    title: TVisualizationTitle,
    fields: TVisualizationFields,
    savedSearchId: string): Promise<IKibanaResponse> {
    const visualization = injector.resolve<Visualization>(Visualization);
    return visualization.create(stateType, serviceNames, title, fields, savedSearchId);
  }

  public createDashboard(title: string, visualizationIds: string[], dashboardGridConfig: IDashboardGridConfig): Promise<IKibanaResponse> {
    const dashboard = injector.resolve<Dashboard>(Dashboard);
    return dashboard.create(title, visualizationIds, dashboardGridConfig);
  }

  public getKibanaObjectsByType(objectType: ObjectTypeEnum): Promise<KibanaObjectModel<{}>[]> {
    const kibanaConnector = injector.resolve<KibanaConnector>(KibanaConnector);
    return kibanaConnector.getAllKibanaObjectsByType(objectType);
  }
}
