import { DashboardGridData } from './models/dashboard-grid-data.model';

interface IGridCoordinates {
  positionX: number;
  positionY: number;
}

export class DashboardGrid {
  private width: number;
  private height: number;
  private positionX: number;
  private positionY: number;
  private maxWidth = 48;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public getGridData(panelIndex: string): DashboardGridData {
    const { positionX, positionY } = this.calculateGridPosition();
    this.positionX = positionX;
    this.positionY = positionY;

    return new DashboardGridData(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
      panelIndex);
  }

  private calculateGridPosition(): IGridCoordinates {
    if (isNaN(this.positionX) || isNaN(this.positionY)) {
      return { positionX: 0, positionY: 0 };
    }

    const remainingWidth = this.maxWidth - this.positionX;

    if (2 * this.width <= remainingWidth) {
      return {
        positionX: this.positionX + this.width,
        positionY: this.positionY,
      };
    }

    return {
      positionX: 0,
      positionY: this.positionY + this.height,
    };
  }
}
