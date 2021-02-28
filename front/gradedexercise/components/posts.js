import { setStatusBarHidden } from 'expo-status-bar'
import React, {useState} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Description from './moreinfo'


export default function posts() {

    const postData = require('../jsondata/posts.json')
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
            <Text>{shouldHide}</Text>
            {postData.map(post => (
                <>
                <View>
                    <Text>{post.title}</Text>
                    <Text>{post.sellerName}</Text>
                    <Text>{post.price}€</Text>
                    <Description description={post.description}/>
                </View>
                </>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    description: {
    }
  });
  