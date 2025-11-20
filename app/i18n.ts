import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import ar from './locales/ar.json';

const LANGUAGE_KEY = '@app_language';
const RELOAD_FLAG_KEY = '@app_reload_flag';

const i18n = new I18n();
i18n.translations = { en, ar };
i18n.locale = Localization.getLocales()[0].languageCode ?? 'en';
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

// Initialize RTL settings on app start
const initializeRTL = async () => {
    try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (savedLanguage) {
            const isRTLLanguage = RTL_LANGUAGES.includes(savedLanguage);
            I18nManager.allowRTL(isRTLLanguage);
            I18nManager.forceRTL(isRTLLanguage);
            console.log('RTL initialized on app start:', isRTLLanguage);
        }
    } catch (error) {
        console.error('Error initializing RTL:', error);
    }
};

// Call initialization
initializeRTL();

export const loadSavedLanguage = async () => {
    try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (savedLanguage) {
            console.log('Loaded saved language:', savedLanguage);
            i18n.locale = savedLanguage;

            // Apply RTL settings for the loaded language
            const isRTLLanguage = RTL_LANGUAGES.includes(savedLanguage);
            I18nManager.allowRTL(isRTLLanguage);
            I18nManager.forceRTL(isRTLLanguage);

            console.log('Applied RTL settings on load:', isRTLLanguage);
            console.log('I18nManager.isRTL:', I18nManager.isRTL);
            console.log('I18nManager.getConstants():', I18nManager.getConstants());

            return savedLanguage;
        }
    } catch (error) {
        console.error('Error loading saved language:', error);
    }
    return null;
};

export const changeLanguage = async (languageCode: string) => {
    i18n.locale = languageCode;

    // Save the language preference
    try {
        await AsyncStorage.setItem(LANGUAGE_KEY, languageCode);
        // Set reload flag to indicate we need one reload
        await AsyncStorage.setItem(RELOAD_FLAG_KEY, 'true');
        console.log('Language saved to AsyncStorage:', languageCode);
    } catch (error) {
        console.error('Error saving language:', error);
    }

    // Handle RTL for Arabic and other RTL languages
    const isRTLLanguage = RTL_LANGUAGES.includes(languageCode);

    I18nManager.allowRTL(isRTLLanguage);
    I18nManager.forceRTL(isRTLLanguage);

    console.log('Language changed to:', languageCode);
    console.log('RTL enabled:', isRTLLanguage);
    console.log('I18nManager.isRTL:', I18nManager.isRTL);
    console.log('I18nManager.getConstants():', I18nManager.getConstants());
};

export const shouldReloadForRTL = async (): Promise<boolean> => {
    try {
        const reloadFlag = await AsyncStorage.getItem(RELOAD_FLAG_KEY);
        return reloadFlag === 'true';
    } catch (error) {
        console.error('Error checking reload flag:', error);
        return false;
    }
};

export const clearReloadFlag = async () => {
    try {
        await AsyncStorage.removeItem(RELOAD_FLAG_KEY);
        console.log('Reload flag cleared');
    } catch (error) {
        console.error('Error clearing reload flag:', error);
    }
};

export const t = (key: string) => i18n.t(key);
export const isRTL = () => RTL_LANGUAGES.includes(i18n.locale);
export default i18n;