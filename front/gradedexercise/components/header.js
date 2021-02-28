import React from 'react'
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native'
import { TouchableOpacity} from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'
import SearchTab from './search'

export default function header() {
    return (
        <View style={styles.header}>
            <View style={styles.headeritem}>
                <TouchableOpacity
                style={styles.button}>
                    <Ionicons name="caret-down-outline" size={20} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.headeritem}></View>
            <View style={styles.headeritem}></View>
        </View>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    header: {
      flex: 1,
      flexDirection: 'row',
      width: width,
      backgroundColor:'yellow',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headeritem:{
        borderWidth: 2,
        width: '100%',
        height: '100%',
        flex: 1,
        alignContent: 'space-between',
        textAlign: 'center'
    },
    button:{
        paddingTop: '15%',
        alignSelf: "center"
    }
  });
  