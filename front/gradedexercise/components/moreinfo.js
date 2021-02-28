import React, {useState} from 'react'
import { View, Text, Button } from 'react-native'

export default function moreinfo(props) {

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
        <View>
            <View>
                {shouldHide ? 
                null :
                <>
                <Text>{props.description}</Text>
                <Text>{props.sellerPhone}</Text>
                <Text>{props.sellerEmail}</Text>
                </>}
            </View>
            <Button
                title="More"
                onPress = {changeHideState} />
        </View>
    )
}
