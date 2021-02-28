import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

export default function header() {
    return (
        <View style={styles.header}>
            <Text>Header</Text>
        </View>
    )
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    header: {
      flex: 1,
      width: width,
      backgroundColor:'gray',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  