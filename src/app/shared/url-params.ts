export class UrlParams {

  static get(url: string, keysVals: {[key: string]: string}) {
    const u = new URL(url);
    const p = new URLSearchParams(u.search);

    for (const key in keysVals) {
      if (p.has(key)) {
        p.delete(key);
      }

      p.set(key, keysVals[key]);
    }

    u.search = p.toString();
    return u.toString();
  }
}
