import * as React from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';


function ZakatDonasiScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', 
      backgroundColor: COLORS.primary}}>
        <Text style={styles.title}>Every donations makes a difference</Text>
        <Button  
  onPress={() => {
    window.open(
      "https://www.paypal.com/donate?token=AylE6ChmtsBb5ab6DR13TWQg5JINlUznwj40UzVLOONFwFxfcwlBnxyEEiZRdxTtHfLhHBXzx9EENIJw",
      "_blank"
    );
  }}
  title="Donate Now"
  color="#FCBB32"
/>
      </View>
    );
  }
  const styles = StyleSheet.create({
    title: {
        justifyContent: "center",
        alignItems: "center",
        color: COLORS.secondary,
        fontSize:20,
        fontWeight:'bold',
        padding: 15,
        marginTop: -400,
    },
    
  });
export default ZakatDonasiScreen;