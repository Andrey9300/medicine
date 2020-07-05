export class DateHelper {
  public static getFullDate() {
    return new Date(Date.now()).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  public static getYear() {
    return new Date().getFullYear();
  }

  public static getMonth() {
    return new Date().getMonth();
  }

  public static getDate() {
    return new Date().getDate();
  }
}
