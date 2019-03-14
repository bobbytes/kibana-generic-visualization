import { defaults } from '../lib/defaults';
import { DashboardGridData } from './models/dashboard-grid-data.model';

interface IGridCoordinates {
  positionX: number;
  positionY: number;
}

export interface IDashboardGridConfig {
  width?: number;
  height?: number;
  maxWidth?: number;
}

export class DashboardGrid {
  private config: IDashboardGridConfig;
  private positionX: number;
  private positionY: number;

  constructor(config: IDashboardGridConfig) {
    const defaultConfig = {
      width: 24,
      height: 15,
      maxWidth: 48,
    };

    this.config = defaults(config, defaultConfig);
  }

  public getGridData(panelIndex: string): DashboardGridData {
    const { positionX, positionY } = this.calculateGridPosition();
    this.positionX = positionX;
    this.positionY = positionY;

    return new DashboardGridData(
      this.positionX,
      this.positionY,
      this.config.width,
      this.config.height,
      panelIndex);
  }

  private calculateGridPosition(): IGridCoordinates {
    if (isNaN(this.positionX) || isNaN(this.positionY)) {
      return { positionX: 0, positionY: 0 };
    }

    const remainingWidth = this.config.maxWidth - this.positionX;

    if (2 * this.config.width <= remainingWidth) {
      return {
        positionX: this.positionX + this.config.width,
        positionY: this.positionY,
      };
    }

    return {
      positionX: 0,
      positionY: this.positionY + this.config.height,
    };
  }
}
