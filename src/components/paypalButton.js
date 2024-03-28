import React, { useRef, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { BackHandler, Platform, } from 'react-native';
import PayPalButton from './src/components/paypalButton';

const PayPalButton = () => {
    const webViewRef = useRef(null);
    const onAndroidBackPress = () => {
        if (webViewRef.current) {
            webViewRef.current.goBack();
            return true; // prevent default behavior (exit app)
        }
        return false;
    };

    useEffect(() => {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
            };
        }
    }, []);
    const paypalButtonHTML =
        `<form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="QD7NJS5R6VSWE" />
        <input type="hidden" name="item_name" value="infaq_operasional_masjid_alfalah" />
        <Button variant="contained" size="large" type="submit">Sedekah Sekarang</Button>
    </form>`
        ;

    return (
        <WebView
            source={{ html: paypalButtonHTML }}
            allowsbackforwardnavigationgestures={true}
            ref={webViewRef}
            style={{
                flex: 1,
                backgroundColor: "grey",
            }}
            scalesPageToFit={false}
        />
    );
};

export default PayPalButton;
