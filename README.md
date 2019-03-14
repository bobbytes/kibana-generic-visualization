<h1 align="center">Kibana Generic Visualizaton</h1>

<p align="center">
  <a href="https://david-dm.org/DaNautilus/kibana-generic-visualization">
    <img src="https://david-dm.org/DaNautilus/kibana-generic-visualization/status.svg?style=flat" alt="dependency" />
  </a>
  <a href="https://travis-ci.org/DaNautilus/kibana-generic-visualization">
    <img src="https://travis-ci.org/DaNautilus/kibana-generic-visualization.svg?branch=master" alt="travis" />
  </a>
  <a href="https://ci.appveyor.com/project/DaNautilus/kibana-generic-visualization/branch/master">
    <img src="https://ci.appveyor.com/api/projects/status/pkgp74uous41f3p2?svg=true&passingText=windows%20passing&pendingText=windows%20pending&failingText=windows%20failing" alt="appveyor" />
  </a>
  <a href="https://sonarcloud.io/dashboard/index/DaNautilus_kibana-generic-visualization">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=DaNautilus_kibana-generic-visualization&metric=coverage" alt="coverage" />
  </a>
  <a href="https://sonarcloud.io/dashboard/index/DaNautilus_kibana-generic-visualization">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=DaNautilus_kibana-generic-visualization&metric=alert_status" alt="quality gate" />
  </a>
</p>

![divider](./divider.png)

## ❯ Why

Generate kibana visualizations and dashboards dynamically.

![divider](./divider.png)

## ❯ Table of Contents

- [Quick Start](#-quick-start)
- [API](#-api)

![divider](./divider.png)

## ❯ Quick Start

### Installation

Install library by using `npm`

```shell
npm install kibana-generic-visualization
```

or by using `yarn`

```shell
yarn add kibana-generic-visualization
```

### How to use

#### Step 1: Import KibanaGenericVisualization

Using `CommonJS` module loader:

```javascript
const { KibanaGenericVisualization } = require('kibana-generic-visualization');
```

Using `ES6` module loader:

```javascript
import { DatabaseMetricsLogger } from 'kibana-generic-visualization';
```

#### Step 2: Create new instance of KibanaGenericVisualization

Create new instance of `KibanaGenericVisualization` and provide config ([about config have a look at API section](#-api)):

```javascript
const options = {
    kibanaVersion: '6.3.2',
    api: {
      host: 'https://api-eu.logz.io/v1',
      token: 'your-kibana-api-secret-token',
    },
};

const kibanaGenericVisualization = new KibanaGenericVisualization(options);
```

#### Step 3: Create visualizations and dashboard

Create visualizations for each service instance and combine them in a dashboard.

```javascript
const serviceNames {
  'my-first-redis-service',
  'my-second-redis-service',
};

const metrics = [
  { fieldName: 'metrics.mem_fragmentation_ratio', customLabel: 'Memory Fragmentation Ratio' },
  { fieldName: 'metrics.evicted_keys', customLabel: 'Removed Keys' },
];

const redisVisualizationIds = await kibanaGenericVisualization.createVisualizations(
  'line', // visualization type
  serviceNames, // service names array
  serviceName => `Redis ${serviceName} Metric`, // generic visualization name
  metrics, // log attributes to display
  'my-saved-search-id' // saved search id
);

const dashboardGridOptions = {
  width: 24,
  height: 15,
  maxWidth: 48,
};

kibanaGenericVisualization.createDashboard('Redis Dashboard', redisVisualizationIds.created, dashboardGridOptions);
```

![divider](./divider.png)

## API

### Options

| Option          | Description               |
| --------------- | ------------------------- |
| `kibanaVersion` | Version of Kibana         |
| `api.host`      | Kibana API endpoint host  |
| `api.token`     | Kibana API endpoint token |

### Methods

| Method                                                                        | Description                            |
| ----------------------------------------------------------------------------- | -------------------------------------- |
| `createVisualizations(stateType, serviceNames, title, fields, savedSearchId)` | Create kibana visualizations           |
| `createDashboard(title, visualizationIds, dashboardGridConfig)`               | Create kibana dashboard                |
| `getKibanaObjectsByType(objectType)`                                          | Get objects from kibana by object type |

![divider](./divider.png)
