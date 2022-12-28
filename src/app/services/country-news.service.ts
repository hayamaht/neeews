import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { getCountryNameByAlpha2 } from 'country-locale-map';
import { CountryCodes } from '~app/models/country-codes';
import { getBrowserLocales, getCountryCodeByLocale } from '~app/shared/countries-locale-map';

@Injectable({
  providedIn: 'root'
})
export class CountryNewsService {

  private countryCodeSource = new Subject<string>();

  countryCode$ = this.countryCodeSource.asObservable();
  currentCountryCode = '';

  avaliableCountryCodes = Object
    .values(CountryCodes);
    //.filter(c => isNaN(+c));

  avaliableCountryNames = this.avaliableCountryCodes
    .map(cc => {
      return {
        name: getCountryNameByAlpha2(cc.toUpperCase())!,
        code: cc,
      }
    })
    .filter(c => c !== undefined);

  constructor() { }

  get localCode() {
    return localStorage.getItem('country_code') || '';
  }
  set localCode(code: string) {
    localStorage.setItem('country_code', code);
  }

  getCountryCode(): string {
    const lsConuntryCode = this.localCode;

    if (!lsConuntryCode) {
      const defaultLocale = getBrowserLocales()[0];
      const code = getCountryCodeByLocale(defaultLocale);
      this.localCode = code;
      this.currentCountryCode = code;
      this.countryCodeSource.next(code);
      return code;
    }

    this.currentCountryCode = lsConuntryCode;
    this.countryCodeSource.next(lsConuntryCode);
    return lsConuntryCode;
  }

  checkAvaliableCountryCodes(code: string): boolean {
    if (!code) return false;
    if (code.length !== 2) return false;

    const checked = this.avaliableCountryCodes
      .some(c => c === code);

    return checked;
  }

  changeCountryCode(code: string) {
    if (!this.checkAvaliableCountryCodes(code)) return;
    this.currentCountryCode = code;
    this.localCode = code;
    this.countryCodeSource.next(code);
  }

  getAvaliableCountryNames() {
    return this.avaliableCountryNames;
  }
}
