import React, {useState} from 'react'
import { View, Text, TextInput, Button, StyleSheet, Dimensions } from 'react-native'

const width = Dimensions.get('window').width;

export default function search() {

    const [shouldHide, updateHideState] = useState(true);

    function changeHideState(){
        if(shouldHide){
            updateHideState(false)
        }
        else{
            updateHideState(true)
        }
    }


    return (
        <View style={styles.input}>
            <TextInput />
        </View>
)

}
const styles = StyleSheet.create({
    input:{
        width: '100%'
    }
})