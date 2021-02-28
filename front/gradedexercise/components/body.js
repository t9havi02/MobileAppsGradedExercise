import React from 'react'
import { StyleSheet, Text, View} from 'react-native';
import Posts from './posts.js'



export default function body() {
    return (
        <View style={styles.body}>
            <Posts/>
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
  