import { parse, UrlWithParsedQuery } from 'url';

export class Utils {
  public static parseUrl(url: string): UrlWithParsedQuery {
    return parse(url, true);
  }
}
