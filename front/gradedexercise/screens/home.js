import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,} from 'react-native';
import Body from '../components/body';
import Header from '../components/header'

export default function home() {
    return (
      <View style={styles.container}>
        <Header />
        <Body />
        <StatusBar style="auto" />
      </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header:{
      flex: 1
    },
    body:{
      flex: 9
    }
});