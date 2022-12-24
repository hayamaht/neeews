import { getAllCountries } from 'country-locale-map';

export function getBrowserLocales(options = {}) {
  const defaulrOptions = {
    languageCodeOnly: false,
  };

  const opt = {
    ...defaulrOptions,
    ...options,
  };

  const browserLocales = navigator.languages === undefined
    ? [navigator.language]
    : navigator.languages;

  if (!browserLocales) {
    return ['en-US'];
  }

  return browserLocales.map(locale => {
    const trimmedLocale = locale.trim();
    return opt.languageCodeOnly
      ? trimmedLocale.split(/-|_/)[0]
      : trimmedLocale;
  });

}

/**
 *
 * 1. input: ja, mid: ja_JP, output: jp
 * 2. input: en-CA, mid: en_CA output: ca
 * 3. input: ko, mid: ko_KR, output: kr
 * 4. input: zh-TW, mid: zh-Hant-TW, output: tw
 * 5. input: **, output: us
 *
 * @param locale The ISO 639 Language Code
 * @returns The ISO 3166 Country Code
 */
export function getCountryByLocale(locale: string): string {
  locale = locale.replace('-', '_');
  const countriess = getAllCountries();
  let cs = countriess
    .map(c => {
      const co = c.default_locale.substring(c.default_locale.length - 2);
      const la = c.default_locale.substring(0, 2);
      if (co !== la && (
        locale === c.default_locale ||
        locale === la ||
        locale === la + '_' + co
      )) {
        return co;
      }

      return '';
    })
    .filter(v =>  v !== '');

  if (cs.length === 0) {
    cs = ['us'];
  }
  return cs[0].toLowerCase();
}
