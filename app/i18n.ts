import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';

import en from './locales/en.json';
import ar from './locales/ar.json';

const i18n = new I18n();
i18n.translations = { en, ar };
i18n.locale = Localization.getLocales()[0].languageCode ?? 'en';
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

export const changeLanguage = (languageCode) => {
    i18n.locale = languageCode;

    // Handle RTL for Arabic and other RTL languages
    const isRTLLanguage = RTL_LANGUAGES.includes(languageCode);

    I18nManager.allowRTL(isRTLLanguage);
    I18nManager.forceRTL(isRTLLanguage);

    console.log('Language changed to:', languageCode);
    console.log('RTL enabled:', isRTLLanguage);
    console.log('I18nManager.isRTL:', I18nManager.isRTL);
    console.log('I18nManager.getConstants():', I18nManager.getConstants());
};

export const t = (key) => i18n.t(key);
export const isRTL = () => RTL_LANGUAGES.includes(i18n.locale);
export default i18n;