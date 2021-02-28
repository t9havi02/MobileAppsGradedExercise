import React from 'react'
import { StyleSheet, Text, View} from 'react-native';

export default function body() {
    return (
        <View style={styles.body}>
            <Text>body</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
      flex: 9,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  