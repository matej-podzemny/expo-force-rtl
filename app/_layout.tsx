import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    I18nManager,
} from 'react-native';

import { changeLanguage, t, isRTL } from './i18n';

import * as Updates from 'expo-updates';

export default function App() {
    const [currentLang, setCurrentLang] = useState('en');
    const [forceUpdate, setForceUpdate] = useState(0);

    const switchLanguage = () => {
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        changeLanguage(newLang);
        setCurrentLang(newLang);
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(currentLang === 'en' ? false : true)

        // Force component re-render to see if RTL takes effect
        setForceUpdate(prev => prev + 1);
    };

    const restart = async () => {
      await Updates.reloadAsync();
    };

    const currentIsRTL = isRTL();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>{t('welcome')}</Text>

                <View style={styles.infoContainer}>
                    <Text style={styles.info}>Current Language: {currentLang}</Text>
                    <Text style={styles.info}>Is RTL: {currentIsRTL ? 'Yes' : 'No'}</Text>
                    <Text style={styles.info}>Is RTL i18Manager: {I18nManager.isRTL ? 'Yes' : 'No'}</Text>



                    <Text style={styles.info}>Force Update Count: {forceUpdate}</Text>
                </View>

                <Text style={styles.testText}>{t('testText')}</Text>

                <TouchableOpacity style={styles.button} onPress={switchLanguage}>
                    <Text style={styles.buttonText}>{t('switchLanguage')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={restart}>
                    <Text style={styles.buttonText}>Restart</Text>
                </TouchableOpacity>

                {/* Test RTL layout with flexDirection */}
                <View style={[styles.flexTest, { flexDirection: currentIsRTL ? 'row-reverse' : 'row' }]}>
                    <View style={[styles.box, { backgroundColor: '#FF6B6B' }]}>
                        <Text style={styles.boxText}>1</Text>
                        <Text style={styles.boxText}>1</Text>
                    </View>
                    <View style={[styles.box, { backgroundColor: '#4ECDC4' }]}>


                        <Text style={styles.boxText}>2</Text>
                    </View>
                    <View style={[styles.box, { backgroundColor: '#45B7D1' }]}>
                        <Text style={styles.boxText}>3</Text>
                    </View>
                </View>

                {/* Test text alignment */}
                <Text style={[styles.alignmentTest, { textAlign: currentIsRTL ? 'right' : 'left' }]}>
                    Text alignment test - should be {currentIsRTL ? 'right' : 'left'} aligned
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContent: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#2c3e50',
    },
    infoContainer: {
        backgroundColor: '#e9ecef',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        width: '100%',
    },
    info: {
        fontSize: 14,
        color: '#495057',
        marginBottom: 5,
    },
    testText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: '#495057',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 30,
        minWidth: 200,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
    flexTest: {
        width: '100%',
        marginBottom: 20,
        justifyContent: 'space-around',
    },
    box: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    boxText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    alignmentTest: {
        fontSize: 16,
        color: '#6c757d',
        width: '100%',
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
});