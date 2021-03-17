/* global localStorage */
import T from 'i18n-react';
import i18nEn from './../i18n/en.json';
import i18nEs from './../i18n/es.json';
import i18nPt from './../i18n/pt.json';
import i18nFr from './../i18n/fr.json';
import i18nIt from './../i18n/it.json';
import i18nDe from './../i18n/de.json';

export const setDefaultLanguage = () => {
  let language =
    localStorage.getItem('language') ||
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage

  localStorage.setItem('language', language)

  // if (language.length > 2) {
  //   language = language.substr(0, 2)
  // }

  switch (language) {
    case 'English':
      T.setTexts(i18nEn)
      break
    case 'Español':
      T.setTexts(i18nEs)
      break
    case 'Português':
      T.setTexts(i18nPt)
      break
    case 'Français':
      T.setTexts(i18nFr)
      break
    case 'it':
      T.setTexts(i18nIt)
      break
    case 'de':
      T.setTexts(i18nDe)
      break
    default:
      T.setTexts(i18nEn)
  }
}

export const getLanguage = () => {
    let language = localStorage.getItem('language') || 'English'
    // if (language.length > 2) {
    //     language = language.substr(0, 2)
    // }

    return language;
}
