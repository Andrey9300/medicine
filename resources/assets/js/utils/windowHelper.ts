export class WindowHelper {
  public static pushState(url: string) {
    history.pushState(null, null, url);
  }
}
