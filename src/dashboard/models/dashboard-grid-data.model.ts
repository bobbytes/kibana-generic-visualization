export class DashboardGridData {
  public x: number;
  public y: number;
  public w: number;
  public h: number;
  public i: string;

  constructor(
    positionX: number,
    positionY: number,
    width: number,
    height: number,
    index: string
  ) {
    this.x = positionX;
    this.y = positionY;
    this.w = width;
    this.h = height;
    this.i = index;
  }
}
