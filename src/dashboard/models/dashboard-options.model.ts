export class DashboardOptionsModel {
  public darkTheme = false;
  public useMargins = true;
  public hidePanelTitles = false;

  public toString(): string {
    return JSON.stringify(this);
  }
}
