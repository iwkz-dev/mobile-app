import * as React from 'react';
import { Text, View } from 'react-native';

function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', 
      backgroundColor: "lightgrey"}}>
        <Text>Home!</Text>
      </View>
    );
  }

export default HomeScreen;